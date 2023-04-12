interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export function toLowerCase(value: string): string {
  return value.toLowerCase();
}

export function trim(value: string): string {
  return value.trim();
}

export function splitString(value: string): string[] {
  const array = value.split(',');

  if (array.length > 0) {
    return array;
  } else {
    return [value];
  }
}

export function toDate(value: string): Date {
  return new Date(value);
}

export function toBoolean(value: string): boolean {
  value = value.toLowerCase();

  return value === 'true' || value === '1' ? true : false;
}

export function toType<T>(values: string[]): T[] {
  return values.map((value) => {
    return value as unknown as T;
  });
}

export function toNumber(value: string, opts: ToNumberOptions = {}): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    newValue = opts.default;
  }

  if (opts.min) {
    if (newValue < opts.min) {
      newValue = opts.min;
    }

    if (newValue > opts.max) {
      newValue = opts.max;
    }
  }

  return newValue;
}

export function filterObject(query: string, object: { [key: string]: string }) {
  const keysFiltered = Object.keys(object).filter((key: string) =>
    key.includes(query),
  );
  if (!keysFiltered.length) return object;

  const filteredObject = keysFiltered.reduce((obj: any, key, index) =>
    index > 1
      ? {
          ...obj,
          [key]: object[key],
        }
      : {
          [key]: object[key],
          [obj]: object[obj],
        },
  );

  if (typeof filteredObject === 'string')
    return { [filteredObject]: filteredObject };

  return filteredObject;
}

export function enumToArrayValues(EnumValues) {
  return Object.keys(EnumValues).map((k) => k);
}

export function isEmail(email: string) {
  return email.includes('@') && email.includes('.com');
}
