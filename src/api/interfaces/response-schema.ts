export interface ResponseSchema<T> {
  success: boolean;
  statusCode: number;
  data: T;
}
