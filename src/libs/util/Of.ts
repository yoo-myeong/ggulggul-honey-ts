import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function Of<T extends object, V>(plain: ClassConstructor<T>, instance: V) {
  const result = plainToInstance<T, V>(plain, instance, { excludeExtraneousValues: true });
  validateSync(result);

  return result;
}
