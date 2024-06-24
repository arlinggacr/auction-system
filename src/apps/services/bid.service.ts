import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Bid } from '../../domain/entities/bid.model';
import { AuctionRepository } from '../../domain/repositories/auction.repositories';
import { BidRepository } from '../../domain/repositories/bid.repositories';

@Injectable()
export class BidService {
  constructor(
    @Inject('BidRepository')
    private readonly bidRepository: BidRepository,
    @Inject('AuctionRepository')
    private readonly auctionRepository: AuctionRepository,
  ) {}

  async placeBid(auctionId: string, bidAmount: number) {
    try {
      const auction = await this.auctionRepository.findById(auctionId);

      auction.placeBid(bidAmount);
      const bid = new Bid(null, bidAmount, new Date(), auctionId);
      return this.bidRepository.save(bid);
    } catch (err) {
      throw new InternalServerErrorException('Failed to save bid');
    }
  }
}
