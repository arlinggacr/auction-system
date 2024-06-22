import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './infrastructure/database/database.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.PG_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    ApiModule,
    DatabaseModule,
  ],
})
export class AppModule {}
