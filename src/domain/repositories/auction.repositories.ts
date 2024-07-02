import { Auction } from '../entities/auction.model';

export interface AuctionRepository {
  findAll(): Promise<Auction[]>;
  findById(id: string): Promise<Auction>;
  save(auction: Auction): Promise<Auction>;
  update(id: string, auction: Auction): Promise<Auction>;
}
