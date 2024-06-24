import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuctionOrmEntity } from './auction.orm-entities';

@Entity('bids')
export class BidOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @ManyToOne(() => AuctionOrmEntity, (auction) => auction.bids, { eager: true })
  @JoinColumn({ name: 'auctionId' })
  auction: AuctionOrmEntity;
}
