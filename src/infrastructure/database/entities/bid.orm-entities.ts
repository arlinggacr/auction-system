import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { convertToUTCPlus7 } from '../../../shared/utils/helpers/timezone';
import { AuctionOrmEntity } from './auction.orm-entities';

@Entity('bids')
export class BidOrmEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @Column()
  amount: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => AuctionOrmEntity, (auction) => auction.bids)
  @JoinColumn({ name: 'auctionId' })
  auction: AuctionOrmEntity;

  @BeforeInsert()
  adjustTimestamps(): void {
    this.createdAt = convertToUTCPlus7(new Date());
  }
}
