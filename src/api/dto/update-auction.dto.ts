import { Optional } from '@nestjs/common';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class UpdateAuctionDto {
  @Optional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Optional()
  @IsString()
  description: string;

  @Optional()
  @IsNumber()
  @Min(0)
  startPrice: number;

  @Optional()
  @IsNumber()
  @Min(0)
  currentPrice: number;

  @Optional()
  @IsDateString()
  endTime: Date;

  @Optional()
  @IsNumber()
  @Min(500)
  buyNowPrice: number;

  @Optional()
  @IsNumber()
  @Min(500)
  jumpBid: number;

  @Optional()
  @IsBoolean()
  isClosed: boolean;
}
