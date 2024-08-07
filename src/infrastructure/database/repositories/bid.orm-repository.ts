import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from '../../../domain/entities/bid.model';
import { BidRepository } from '../../../domain/repositories/bid.repositories';
import { add24Hours } from '../../../shared/utils/helpers/add24Hours';
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

    const bidEntity = this.bidRepository.create({
      amount: bid.amount,
      createdAt: bid.createdAt,
      auction,
    });

    if (bid.auctionId && auction) {
      await this.auctionRepository.update(bid.auctionId, {
        currentPrice: bid.amount,
      });
    }

    if (auction.buyNowPrice === bid.amount) {
      await this.auctionRepository.update(bid.auctionId, {
        isClosed: true,
      });
    }

    await this.auctionRepository.update(bid.auctionId, {
      endTime: add24Hours(auction.endTime),
    });

    const savedBid = await this.bidRepository.save(bidEntity);

    return new Bid(
      savedBid.id,
      savedBid.amount,
      savedBid.createdAt,
      savedBid.auction.id,
    );
  }

  async findAllBid(auctionId: string): Promise<Bid[]> {
    const bids = await this.bidRepository.find({
      where: { auction: { id: auctionId } },
    });
    return bids.map((mapped) => ({
      id: mapped.id,
      amount: mapped.amount,
      createdAt: mapped.createdAt,
    }));
  }
}
