import { TransformFnParams } from 'class-transformer';

export class TransformHelper {
  public static trim({ value }) {
    return value ? value.trim() : value;
  }
}
