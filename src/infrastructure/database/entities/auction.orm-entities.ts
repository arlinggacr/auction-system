import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BidOrmEntity } from './bid.orm-entities';

@Entity('auctions')
export class AuctionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
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

  @OneToMany(() => BidOrmEntity, (bid) => bid.auction)
  bids: BidOrmEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  adjustTimestamp(): void {
    if (this.endTime) {
      const adjustedDate = new Date(this.endTime);
      adjustedDate.setHours(adjustedDate.getHours() + 7);
      this.endTime = adjustedDate;
    }
  }
}
