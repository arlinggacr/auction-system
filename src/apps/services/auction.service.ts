import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Auction } from '../../domain/entities/auction.model';
import { AuctionRepository } from '../../domain/repositories/auction.repositories';

@Injectable()
export class AuctionService {
  constructor(
    @Inject('AuctionRepository')
    private readonly auctionRepository: AuctionRepository,
  ) {}

  async createAuction(auction: Auction): Promise<Auction> {
    try {
      return await this.auctionRepository.save(auction);
    } catch (err) {
      console.error('Error creating auction:', err);
      throw new InternalServerErrorException('Server Error');
    }
  }

  async findAllAuctions(): Promise<Auction[]> {
    try {
      return await this.auctionRepository.findAll();
    } catch (err) {
      console.error('Error finding all auctions:', err);
      throw new InternalServerErrorException('Server Error');
    }
  }

  async findAuctionById(id: string): Promise<Auction> {
    try {
      const auction = await this.auctionRepository.findById(id);
      if (!auction) {
        throw new NotFoundException('Auction not found');
      }
      return auction;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      console.error(`Error finding auction by id ${id}:`, err);
      throw new InternalServerErrorException('Server Error');
    }
  }
}
