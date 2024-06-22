import { Inject, Injectable } from '@nestjs/common';
import { Auction } from '../../domain/entities/auction.model';
import { AuctionRepository } from '../../domain/repositories/auction.repositories';

@Injectable()
export class CreateAuction {
  constructor(
    @Inject('AuctionRepository')
    private readonly auctionRepository: AuctionRepository,
  ) {}

  execute(auction: Auction): Promise<Auction> {
    return this.auctionRepository.save(auction);
  }
}
