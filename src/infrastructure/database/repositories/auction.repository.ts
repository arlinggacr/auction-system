import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const auctions = await this.auctionRepository.find({
        relations: ['bids'],
      });
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
    } catch (error) {
      console.error('Error finding all auctions:', error);
      throw new InternalServerErrorException('Failed to find all auctions');
    }
  }

  async findById(id: number): Promise<Auction> {
    try {
      const auction = await this.auctionRepository.findOne({
        where: { id },
        relations: ['bids'],
      });

      if (!auction) {
        throw new NotFoundException('Auction not found');
      }

      return new Auction(
        auction.id,
        auction.title,
        auction.description,
        auction.startPrice,
        auction.currentPrice,
        auction.endTime,
      );
    } catch (error) {
      console.error(`Error finding auction by id ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to find auction by id');
    }
  }

  async save(auction: Auction): Promise<Auction> {
    try {
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
    } catch (error) {
      console.error('Error saving auction:', error);
      throw new InternalServerErrorException('Failed to save auction');
    }
  }
}
