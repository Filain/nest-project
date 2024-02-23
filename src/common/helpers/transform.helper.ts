import { TransformFnParams } from 'class-transformer';

export class TransformHelper {
  public static trim(): (param: TransformFnParams) => any {
    return ({ value }) => value.trim();
  }
}
