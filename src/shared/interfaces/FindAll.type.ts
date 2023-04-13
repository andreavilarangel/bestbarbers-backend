export type FindAllResponseType<T> = [T[], number];

export type FindAllParamsType<T> = {
  skip: number;
  take: number;
  where: T;
};

export type OrderByType<T> = {
  orderBy?: T;
};
