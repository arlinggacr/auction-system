import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuctionEntity } from './auction.entities';

@Entity('bids')
export class BidEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @ManyToOne(() => AuctionEntity, (auction) => auction.bids)
  auction: AuctionEntity;
}
