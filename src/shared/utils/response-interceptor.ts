import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { ResponseSchema } from '../../api/interfaces/response-schema';
@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseSchema<T>>
{
  logger: Logger;

  constructor() {
    this.logger = new Logger(ResponseInterceptor.name);
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseSchema<T>> {
    this.logger.log('Execute ResponseInterceptor class');
    const res = context.switchToHttp().getResponse();
    return next
      .handle()
      .pipe(
        map((data) => ({ success: true, data, statusCode: res.statusCode })),
      );
  }
}
