import {
  BeforeInsert,
  BeforeUpdate,
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

  @ManyToOne(() => AuctionOrmEntity, (auction) => auction.bids)
  @JoinColumn({ name: 'auctionId' })
  auction: AuctionOrmEntity;

  @BeforeInsert()
  @BeforeUpdate()
  adjustTimestamp(): void {
    if (this.timestamp) {
      const adjustedDate = new Date(this.timestamp);
      adjustedDate.setHours(adjustedDate.getHours() + 7);
      this.timestamp = adjustedDate;
    }
  }
}
