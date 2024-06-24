import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class PlaceBidDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @Min(0)
  amount: number;
}
