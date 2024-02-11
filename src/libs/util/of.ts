import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CustomError } from '../error/filter/CustomError';
import { ErrorCode } from '../error/errorCode';

export async function of<T extends object, V>(plain: ClassConstructor<T>, instance: V) {
  const result = plainToInstance<T, V>(plain, instance, { excludeExtraneousValues: true });

  const validated = await validate(result);

  if (validated.length) {
    const message = validated.map((it) => Object.values(it.constraints!)[0]).join(', ');

    throw new CustomError(ErrorCode.BAD_REQUEST, message);
  }

  return result;
}
