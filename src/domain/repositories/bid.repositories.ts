import { Bid } from '../entities/bid.model';

export interface BidRepository {
  save(bid: Bid): Promise<Bid>;
}
