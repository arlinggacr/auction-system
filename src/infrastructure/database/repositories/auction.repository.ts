import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auction } from '../../../domain/entities/auction.model';
import { AuctionRepository } from '../../../domain/repositories/auction.repositories';
import { AuctionEntity } from '../entities/auction.entities';

@Injectable()
export class AuctionTypeOrmRepository implements AuctionRepository {
  constructor(
    @InjectRepository(AuctionEntity)
    private readonly auctionRepository: Repository<AuctionEntity>,
  ) {}

  async findAll(): Promise<Auction[]> {
    const auctions = await this.auctionRepository.find({ relations: ['bids'] });
    return auctions.map(
      (a) =>
        new Auction(
          a.id,
          a.title,
          a.description,
          a.startPrice,
          a.currentPrice,
          a.endTime,
        ),
    );
  }

  async findById(id: number): Promise<Auction> {
    const auction = await this.auctionRepository.findOne({
      where: { id },
      relations: ['bids'],
    });
    return new Auction(
      auction.id,
      auction.title,
      auction.description,
      auction.startPrice,
      auction.currentPrice,
      auction.endTime,
    );
  }

  async save(auction: Auction): Promise<Auction> {
    const auctionEntity = this.auctionRepository.create(auction);
    const savedAuction = await this.auctionRepository.save(auctionEntity);
    return new Auction(
      savedAuction.id,
      savedAuction.title,
      savedAuction.description,
      savedAuction.startPrice,
      savedAuction.currentPrice,
      savedAuction.endTime,
    );
  }
}
