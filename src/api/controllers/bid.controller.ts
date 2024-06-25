import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BidService } from 'src/apps/services/bid.service';
import { PlaceBidDto } from '../dto/place-bid.dto';
import { ResponseInterceptor } from '../interfaces/response-interceptor';

@Controller('bids')
export class BidController {
  constructor(private readonly bidService: BidService) {}
  @Post('create-bid/:id')
  @UseInterceptors(ResponseInterceptor)
  craeteBid(@Param('id') id: string, @Body() placeBidDto: PlaceBidDto) {
    return this.bidService.placeBid(id, placeBidDto.amount);
  }

  @Get('all-bid/:id')
  @UseInterceptors(ResponseInterceptor)
  getAllBid(@Param('id') id: string) {
    return this.bidService.findAllBids(id);
  }
}
