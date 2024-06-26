import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { convertToUTCPlus7 } from '../../../shared/utils/helpers/timezone';
import { BidOrmEntity } from './bid.orm-entities';

@Entity('auctions')
export class AuctionOrmEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  startPrice: number;

  @Column()
  currentPrice: number;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ nullable: true })
  buyNowPrice: number;

  @Column({ nullable: true })
  jumpBid?: number;

  @Column({ nullable: true })
  isClosed?: boolean;

  // @Column({ nullable: true })
  // winnerAuction: string;

  // @Column({ nullable: true })
  // createdBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => BidOrmEntity, (bid) => bid.auction)
  bids: BidOrmEntity[];

  @BeforeInsert()
  adjustTimestamps(): void {
    // Adjust endTime to UTC+7 if it exists
    if (this.endTime) {
      this.endTime = convertToUTCPlus7(this.endTime);
    }

    // Ensure createdAt and updatedAt are in UTC+7
    this.createdAt = convertToUTCPlus7(new Date());
  }

  @BeforeInsert()
  @BeforeUpdate()
  updateTimestamps(): void {
    this.updatedAt = convertToUTCPlus7(new Date());
  }
}
