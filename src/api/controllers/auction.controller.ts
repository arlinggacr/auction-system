import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BidService } from 'src/apps/services/bid.service';
import { AuctionService } from '../../apps/services/auction.service';
import { Auction } from '../../domain/entities/auction.model';
import { CreateAuctionDto } from '../dto/create-auction.dto';
import { PlaceBidDto } from '../dto/place-bid.dto';
import { ResponseInterceptor } from '../interfaces/response-interceptor';

@Controller('auctions')
export class AuctionController {
  constructor(
    private readonly auctionService: AuctionService,
    private readonly bidService: BidService,
  ) {}

  @Get('all')
  @UseInterceptors(ResponseInterceptor)
  findAll() {
    return this.auctionService.findAllAuctions();
  }

  @Get(':id')
  @UseInterceptors(ResponseInterceptor)
  findById(@Param('id') id: string) {
    return this.auctionService.findAuctionById(id);
  }

  @Post()
  @UseInterceptors(ResponseInterceptor)
  create(@Body() createAuctionDto: CreateAuctionDto) {
    return this.auctionService.createAuction(
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
  bid(@Param('id') id: string, @Body('amount') placeBidDto: PlaceBidDto) {
    return this.bidService.placeBid(id, placeBidDto.amount);
  }
}
