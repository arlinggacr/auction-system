// custom-error.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class resErrorHandler extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(
      {
        message,
        statusCode: status,
      },
      status,
    );
  }
}
