import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { resErrorHandler } from 'src/shared/utils/exception-handler';
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
        throw new resErrorHandler('No Auction Found', HttpStatus.NOT_FOUND);
      }

      if (auction.currentPrice >= amount) {
        throw new resErrorHandler(
          'Amount must be greater than current price',
          HttpStatus.BAD_REQUEST,
        );
      }

      const multiplyBid = (amount - auction.currentPrice) % auction.jumpBid;
      if (multiplyBid !== 0) {
        throw new resErrorHandler(
          'Amount must be a multiple of the jumpBid',
          HttpStatus.BAD_REQUEST,
        );
      }

      auction.placeBid(amount);
      const bid = new Bid(null, amount, new Date(), auctionId);
      return this.bidRepository.save(bid);
    } catch (error) {
      if (error instanceof resErrorHandler) {
        throw error;
      } else {
        console.error('Error placing bid:', error);
        throw new resErrorHandler(
          'Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findAllBids(auctionId: string) {
    try {
      const bids = await this.bidRepository.findAllBid(auctionId);
      if (!bids) {
        throw new NotFoundException('Auction not found');
      }
      return bids;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      } else {
        console.error('Error Finding all bids: ', err);
        throw new InternalServerErrorException('Server Error');
      }
    }
  }
}
