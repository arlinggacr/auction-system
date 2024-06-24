import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AuctionOrmEntity } from './entities/auction.orm-entities';
import { BidOrmEntity } from './entities/bid.orm-entities';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      ssl: { rejectUnauthorized: false },
      autoLoadEntities: true,
      synchronize: true,
      uuidExtension: 'pgcrypto',
    }),
    TypeOrmModule.forFeature([AuctionOrmEntity, BidOrmEntity]),
  ],
})
export class DatabaseModule {}
