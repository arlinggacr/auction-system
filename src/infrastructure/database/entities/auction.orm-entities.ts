import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BidOrmEntity } from './bid.orm-entities';

@Entity('auctions')
export class AuctionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => BidOrmEntity, (bid) => bid.auction)
  bids: BidOrmEntity[];
}
