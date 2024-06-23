import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateAuction } from '../../apps/use-cases/create-auction';
import { FindAllAuction } from '../../apps/use-cases/find-all-auction';
import { FindByIdAuction } from '../../apps/use-cases/find-by-id-auction';
import { PlaceBid } from '../../apps/use-cases/place-bid';
import { Auction } from '../../domain/entities/auction.model';
import { CreateAuctionDto } from '../dto/create-auction.dto';
import { ResponseInterceptor } from '../interfaces/response-interceptor';

@Controller('auctions')
export class AuctionController {
  constructor(
    private readonly createAuction: CreateAuction,
    private readonly placeBid: PlaceBid,
    private readonly findAllAuctions: FindAllAuction,
    private readonly findAuctionById: FindByIdAuction,
  ) {}

  @Get('all')
  @UseInterceptors(ResponseInterceptor)
  findAll() {
    return this.findAllAuctions.execute();
  }

  @Get(':id')
  @UseInterceptors(ResponseInterceptor)
  findById(@Param('id') id: number) {
    return this.findAuctionById.execute(Number(id));
  }

  @Post()
  @UseInterceptors(ResponseInterceptor)
  create(@Body() createAuctionDto: CreateAuctionDto) {
    return this.createAuction.execute(
      new Auction(
        null,
        createAuctionDto.title,
        createAuctionDto.description,
        createAuctionDto.startPrice,
        createAuctionDto.startPrice,
        createAuctionDto.endTime,
      ),
    );
  }

  @Post('bid/:id')
  @UseInterceptors(ResponseInterceptor)
  bid(@Param('id') id: number, @Body('amount') amount: number) {
    return this.placeBid.execute(id, amount);
  }
}
