import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from '../../../domain/entities/bid.model';
import { BidRepository } from '../../../domain/repositories/bid.repositories';
import { AuctionEntity } from '../entities/auction.entities';
import { BidEntity } from '../entities/bid.entities';

@Injectable()
export class BidTypeOrmRepository implements BidRepository {
  constructor(
    @InjectRepository(BidEntity)
    private readonly bidRepository: Repository<BidEntity>,
    @InjectRepository(AuctionEntity)
    private readonly auctionRepository: Repository<AuctionEntity>,
  ) {}

  async save(bid: Bid): Promise<Bid> {
    try {
      const auction = await this.auctionRepository.findOne({
        where: { id: bid.auctionId },
      });
      const bidEntity = this.bidRepository.create({ ...bid, auction });
      const savedBid = await this.bidRepository.save(bidEntity);

      return new Bid(
        savedBid.id,
        savedBid.amount,
        savedBid.timestamp,
        savedBid.auction.id,
      );
    } catch (error) {
      throw new InternalServerErrorException('Something Went Wrong');
    }
  }
}
