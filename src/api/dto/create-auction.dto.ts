import {
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
  @IsNotEmpty()
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
}
