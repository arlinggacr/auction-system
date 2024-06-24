import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionService } from '../apps/services/auction.service';
import { BidService } from '../apps/services/bid.service';
import { AuctionOrmEntity } from '../infrastructure/database/entities/auction.orm-entities';
import { BidOrmEntity } from '../infrastructure/database/entities/bid.orm-entities';
import { AuctionTypeOrmRepository } from '../infrastructure/database/repositories/auction.orm-repository';
import { BidTypeOrmRepository } from '../infrastructure/database/repositories/bid.orm-repository';
import { AuctionGateway } from '../infrastructure/web-sockets/auction.gateway';
import { AuctionController } from './controllers/auction.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuctionOrmEntity, BidOrmEntity])],
  controllers: [AuctionController],
  providers: [
    AuctionService,
    BidService,
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
