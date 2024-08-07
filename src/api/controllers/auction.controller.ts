import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuctionService } from '../../apps/services/auction.service';
import { Auction } from '../../domain/entities/auction.model';
import { ResponseInterceptor } from '../../shared/utils/response-interceptor';
import { CreateAuctionDto } from '../dto/create-auction.dto';
import { UpdateAuctionDto } from '../dto/update-auction.dto';

@Controller('auctions')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

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
        createAuctionDto.buyNowPrice,
        createAuctionDto.jumpBid,
        createAuctionDto.isClosed,
      ),
    );
  }

  @Patch('update/:id')
  @UseInterceptors(ResponseInterceptor)
  update(@Param('id') id: string, @Body() updateAuctionDto: UpdateAuctionDto) {
    return this.auctionService.updateAuction(
      id,
      new Auction(
        id,
        updateAuctionDto.title,
        updateAuctionDto.description,
        updateAuctionDto.startPrice,
        updateAuctionDto.startPrice,
        updateAuctionDto.endTime,
        updateAuctionDto.buyNowPrice,
        updateAuctionDto.jumpBid,
        updateAuctionDto.isClosed,
      ),
    );
  }
}
