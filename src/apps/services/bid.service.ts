import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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

  async placeBid(auctionId: string, amount: number) {
    try {
      const auction = await this.auctionRepository.findById(auctionId);
      if (!auction) {
        throw new NotFoundException('No Auction Found');
      }

      if (auction?.currentPrice > amount) {
        throw new BadRequestException(
          'Amount must be greater than current price',
        );
      }
      auction.placeBid(amount);
      const bid = new Bid(null, amount, new Date(), auctionId);
      return this.bidRepository.save(bid);
    } catch (err) {
      console.error(err);

      throw new InternalServerErrorException('Failed to save bid');
    }
  }

  async findAllBids(auctionId: string) {
    try {
      const bids = await this.bidRepository.findAllBid(auctionId);
      if (!bids) {
        throw new NotFoundException('Auction not found');
      }
      console.log(bids);

      return bids;
    } catch (err) {
      throw new InternalServerErrorException('Failed to find bid');
    }
  }
}
