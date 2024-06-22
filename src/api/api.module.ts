import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAuction } from '../apps/use-cases/create-auction';
import { PlaceBid } from '../apps/use-cases/place-bid';
import { AuctionEntity } from '../infrastructure/database/entities/auction.entities';
import { BidEntity } from '../infrastructure/database/entities/bid.entities';
import { AuctionTypeOrmRepository } from '../infrastructure/database/repositories/auction.repository';
import { BidTypeOrmRepository } from '../infrastructure/database/repositories/bid.repository';
import { AuctionGateway } from '../infrastructure/web-sockets/auction.gateway';
import { AuctionController } from './controllers/auction.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuctionEntity, BidEntity])],
  controllers: [AuctionController],
  providers: [
    CreateAuction,
    PlaceBid,
    AuctionGateway,
    {
      provide: 'AuctionRepository',
      useClass: AuctionTypeOrmRepository,
    },
    {
      provide: 'BidRepository',
      useClass: BidTypeOrmRepository,
    },
  ],
})
export class ApiModule {}
