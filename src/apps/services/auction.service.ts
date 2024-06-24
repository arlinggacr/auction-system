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
    } catch (error) {
      console.error('Error creating auction:', error);
      throw new InternalServerErrorException('Failed to create auction');
    }
  }

  async findAllAuctions(): Promise<Auction[]> {
    try {
      return await this.auctionRepository.findAll();
    } catch (error) {
      console.error('Error finding all auctions:', error);
      throw new InternalServerErrorException('Failed to find all auctions');
    }
  }

  async findAuctionById(id: string): Promise<Auction> {
    try {
      const auction = await this.auctionRepository.findById(id);
      if (!auction) {
        throw new NotFoundException('Auction not found');
      }
      return auction;
    } catch (error) {
      console.error(`Error finding auction by id ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to find auction by id');
    }
  }
}
