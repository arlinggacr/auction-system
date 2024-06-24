import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from '../../../domain/entities/bid.model';
import { BidRepository } from '../../../domain/repositories/bid.repositories';
import { AuctionOrmEntity } from '../entities/auction.orm-entities';
import { BidOrmEntity } from '../entities/bid.orm-entities';

@Injectable()
export class BidTypeOrmRepository implements BidRepository {
  constructor(
    @InjectRepository(BidOrmEntity)
    private readonly bidRepository: Repository<BidOrmEntity>,
    @InjectRepository(AuctionOrmEntity)
    private readonly auctionRepository: Repository<AuctionOrmEntity>,
  ) {}

  async save(bid: Bid): Promise<Bid> {
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
  }
}
