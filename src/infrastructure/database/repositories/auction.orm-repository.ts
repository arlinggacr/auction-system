import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auction } from '../../../domain/entities/auction.model';
import { AuctionRepository } from '../../../domain/repositories/auction.repositories';
import { AuctionOrmEntity } from '../entities/auction.orm-entities';

@Injectable()
export class AuctionTypeOrmRepository implements AuctionRepository {
  constructor(
    @InjectRepository(AuctionOrmEntity)
    private readonly auctionRepository: Repository<AuctionOrmEntity>,
  ) {}

  async findAll(): Promise<Auction[]> {
    const auctions = await this.auctionRepository.find({
      relations: ['bids'],
    });

    return auctions.map(
      (mapped) =>
        new Auction(
          mapped.id,
          mapped.title,
          mapped.description,
          mapped.startPrice,
          mapped.currentPrice,
          mapped.endTime,
          mapped.buyNowPrice,
          mapped.jumpBid,
          mapped.isClosed,
        ),
    );
  }

  async findById(id: string): Promise<Auction> {
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
      auction.buyNowPrice,
      auction.jumpBid,
      auction.isClosed,
    );
  }

  async save(auction: Auction): Promise<Auction> {
    const auctionEntity = this.auctionRepository.create({
      title: auction.title,
      description: auction.description,
      startPrice: auction.startPrice,
      currentPrice: auction.currentPrice,
      endTime: auction.endTime,
      buyNowPrice: auction.buyNowPrice,
      jumpBid: auction.jumpBid,
      isClosed: false,
    });

    const savedAuction = await this.auctionRepository.save(auctionEntity);

    return new Auction(
      savedAuction.id,
      savedAuction.title,
      savedAuction.description,
      savedAuction.startPrice,
      savedAuction.currentPrice,
      savedAuction.endTime,
      savedAuction.buyNowPrice,
      savedAuction.jumpBid,
      savedAuction.isClosed,
    );
  }

  async update(id: string, auction: Auction): Promise<Auction> {
    const existingAuction = await this.auctionRepository.findOne({
      where: { id },
    });

    Object.assign(existingAuction, auction);

    console.log(existingAuction);

    const updatedAuction = await this.auctionRepository.save(existingAuction);
    return new Auction(
      updatedAuction.id,
      updatedAuction.title,
      updatedAuction.description,
      updatedAuction.startPrice,
      updatedAuction.currentPrice,
      updatedAuction.endTime,
      updatedAuction.buyNowPrice,
      updatedAuction.jumpBid,
      updatedAuction.isClosed,
    );
  }
}
