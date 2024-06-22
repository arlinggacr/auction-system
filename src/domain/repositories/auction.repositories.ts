import { Auction } from '../entities/auction.model';

export interface AuctionRepository {
  findAll(): Promise<Auction[]>;
  findById(id: number): Promise<Auction>;
  save(auction: Auction): Promise<Auction>;
}
