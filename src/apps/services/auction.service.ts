import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { resErrorHandler } from 'src/shared/utils/exception-handler';
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
      throw new resErrorHandler(
        'Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllAuctions(): Promise<Auction[]> {
    try {
      return await this.auctionRepository.findAll();
    } catch (err) {
      console.error('Error finding all auctions:', err);
      throw new resErrorHandler(
        'Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAuctionById(id: string): Promise<Auction> {
    try {
      const auction = await this.auctionRepository.findById(id);
      if (!auction) {
        throw new resErrorHandler('Auction not found', HttpStatus.NOT_FOUND);
      }
      return auction;
    } catch (err) {
      if (err instanceof resErrorHandler) {
        throw err;
      }
      console.error(`Error finding auction by id ${id}:`, err);
      throw new resErrorHandler(
        'Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateAuction(id: string, auction: Auction): Promise<Auction> {
    try {
      const auctionData = await this.auctionRepository.findById(id);
      if (!auctionData) {
        throw new resErrorHandler('Auction not found', HttpStatus.NOT_FOUND);
      }
      return await this.auctionRepository.update(id, auction);
    } catch (err) {
      if (err instanceof resErrorHandler) {
        throw err;
      }
      console.error(err);
      throw new resErrorHandler(
        'Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
