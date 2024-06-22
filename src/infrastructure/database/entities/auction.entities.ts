import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BidEntity } from './bid.entities';

@Entity('auctions')
export class AuctionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  startPrice: number;

  @Column()
  currentPrice: number;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @OneToMany(() => BidEntity, (bid) => bid.auction)
  bids: BidEntity[];
}
