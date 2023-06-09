import {
  parseISO,
  format,
  addMinutes,
  differenceInMinutes,
  getISODay,
} from 'date-fns';

export const hours_generator = ({ date, start_hour, finish_hour }) => {
  const start = parseISO(`${date} ${start_hour}`);
  const finish = parseISO(`${date} ${finish_hour}`);
  const total_of_minutes = differenceInMinutes(finish, start);

  const interval = 10;

  const start_param = new Date(`2022-02-10 ${start_hour}`);

  const hours = [];

  for (let i = 0; i < total_of_minutes; i++) {
    if (i === 0 || i % interval === 0) {
      const scheduleHour = format(addMinutes(start_param, i), 'HH:mm');
      hours.push(scheduleHour);
    }
  }
  return hours;
};

export const checkTimeAvailability = ({
  date,
  item_time,
  close_hour,
  current_hour,
  current_date,
  appointments,
  blocked_times,
  time_required,
}) => {
  // get time with service
  const separate_time = {
    hours: Number(time_required.substring(0, 2)),
    minutes: Number(time_required.substring(3, 5)),
  };
  // get total of required minutes
  const total_of_required_minutes =
    separate_time.minutes + 60 * separate_time.hours;
  // create any date to add minutes
  const created_date = new Date(`2022-02-10 ${item_time}`);
  // finish time prevision -> item_time + total_of_required
  const finish_time_prevision = format(
    addMinutes(created_date, total_of_required_minutes),
    'HH:mm:ss',
  );
  // check will be finish the service after close hour
  const finish_after_close = finish_time_prevision > `${close_hour}:00`;
  // check will be finish after 00:00
  const finish_after_00 = finish_time_prevision.substring(0, 2) === '00';
  if (finish_after_close || finish_after_00) {
    return false;
  }

  // check if it's today -> if today need to have 10 minutes of antecedence
  if (date === current_date) {
    const limit_date = new Date(`${current_date} ${current_hour}`);
    const limit_hour = format(addMinutes(limit_date, 10), 'HH:mm:ss');
    const check_is_after =
      item_time >= limit_hour && finish_time_prevision > limit_hour;
    if (!check_is_after) {
      return false;
    }
  }

  const notAvailableConditions = (item) => {
    const { finish_hour, start_hour } = item;
    return (
      item_time < String(finish_hour) &&
      (finish_time_prevision > String(finish_hour) ||
        (finish_time_prevision > String(start_hour) &&
          finish_time_prevision <= String(finish_hour)))
    );
  };

  let day_of_week = getISODay(new Date(date));
  // [date-fns] segunda-feira = 7 e terça-feira = 1
  // [bando de dados] domingo = 7 e segunda-feira = 1
  day_of_week = day_of_week === 7 ? 1 : day_of_week + 1;

  const checkBlockedTimes = blocked_times.find(
    (b) =>
      // condition for repeat every day
      (b.repeat_every_day && notAvailableConditions(b)) ||
      // condition for repeat every week day
      (b.repeat_every_week_day === day_of_week && notAvailableConditions(b)) ||
      // condition for specific date
      (b.date === date && notAvailableConditions(b)),
  );
  if (checkBlockedTimes) {
    return false;
  }

  const checkAppointments = appointments.find((a) => notAvailableConditions(a));
  if (checkAppointments) {
    return false;
  }

  return true;
};
