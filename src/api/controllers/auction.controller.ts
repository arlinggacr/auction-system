import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateAuction } from '../../apps/use-cases/create-auction';
import { PlaceBid } from '../../apps/use-cases/place-bid';
import { Auction } from '../../domain/entities/auction.model';

@Controller('auctions')
export class AuctionController {
  constructor(
    private readonly createAuction: CreateAuction,
    private readonly placeBid: PlaceBid,
  ) {}

  @Post()
  create(@Body() auction: Partial<Auction>) {
    return this.createAuction.execute(
      new Auction(
        null,
        auction.title,
        auction.description,
        auction.startPrice,
        auction.startPrice,
        auction.endTime,
      ),
    );
  }

  @Post(':id/bid')
  bid(@Param('id') id: string, @Body('amount') amount: number) {
    return this.placeBid.execute(Number(id), amount);
  }
}
