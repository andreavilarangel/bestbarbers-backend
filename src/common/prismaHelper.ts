import { omit } from 'radash';

/* export const prismaConnect = (values: number[], key: string) => ({
  connect: values.map(id => ({ [key]: id })),
})

export const prismaDisconnect = <T>(
  currentValues: number[],
  oldValues: T[],
  key: string,
) => ({
  disconnect: oldValues
    .filter(
      oldValue =>
        currentValues.find(
          idCurrentValue => oldValue[key] !== idCurrentValue,
        ) && oldValue[key],
    )
    .map(id => ({ [key]: id })),
})

export const prismaUpdateRelationship = <T>(
  currentValues: number[],
  oldValues: T[],
  key: string,
) => ({
  ...prismaConnect(currentValues, key),
  ...prismaDisconnect(currentValues, oldValues, key),
}) */

type Entity = { id?: string };

export const prismaConnectMany = <T extends Entity>(values: T[]) =>
  values.map((value: T) => ({ id: value.id }));

export const prismaUpdateMany = <T extends Entity>(values: T[]) =>
  values
    ?.filter((value) => !!value.id)
    ?.map((value) => ({ where: { id: value.id }, data: omit(value, ['id']) }));

export const prismaDeleteOrDisconnectMany = <
  T extends Entity,
  K extends Entity,
>(
  currentValues: T[],
  oldValues: K[],
  key: string | 'id' = 'id',
) =>
  currentValues?.length &&
  oldValues
    ?.filter(
      (oldValue) =>
        !currentValues?.find(
          (currentValue) => currentValue[key] === oldValue[key],
        ),
    )
    ?.map((oldValue) => ({ id: oldValue.id }));

export const prismaCreateMany = <T, K extends Entity>(values: K[]) =>
  values?.filter((value) => !value.id) as undefined as T[];

export const prismaUpdateManyRelationship = <T extends Entity>(
  currentValues: T[],
  oldValues: T[],
  key: string | 'id' = 'id',
) => ({
  update: prismaUpdateMany(currentValues),
  delete: prismaDeleteOrDisconnectMany(currentValues, oldValues, key),
  create: prismaCreateMany(currentValues),
});
