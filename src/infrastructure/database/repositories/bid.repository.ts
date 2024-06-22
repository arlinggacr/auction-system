import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from '../../../domain/entities/bid.model';
import { BidRepository } from '../../../domain/repositories/bid.repositories';
import { BidEntity } from '../entities/bid.entities';

@Injectable()
export class BidTypeOrmRepository implements BidRepository {
  constructor(
    @InjectRepository(BidEntity)
    private readonly bidRepository: Repository<BidEntity>,
  ) {}

  async save(bid: Bid): Promise<Bid> {
    const bidEntity = this.bidRepository.create(bid);
    const savedBid = await this.bidRepository.save(bidEntity);
    return new Bid(
      savedBid.id,
      savedBid.amount,
      savedBid.timestamp,
      savedBid.auction.id,
    );
  }
}
