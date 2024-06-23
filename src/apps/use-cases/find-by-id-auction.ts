import { Inject, Injectable } from '@nestjs/common';
import { Auction } from '../../domain/entities/auction.model';
import { AuctionRepository } from '../../domain/repositories/auction.repositories';

@Injectable()
export class FindByIdAuction {
  constructor(
    @Inject('AuctionRepository')
    private readonly auctionRepository: AuctionRepository,
  ) {}

  execute(id: number): Promise<Auction> {
    return this.auctionRepository.findById(id);
  }
}
