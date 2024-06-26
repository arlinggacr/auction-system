import { Optional } from '@nestjs/common';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateAuctionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  startPrice: number;

  @IsDateString()
  endTime: Date;

  @IsNumber()
  @Min(1)
  buyNowPrice: number;

  @IsNumber()
  @Min(500)
  jumpBid: number;

  @Optional()
  @IsBoolean()
  isClosed: boolean;
}
