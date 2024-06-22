import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PlaceBid } from '../../apps/use-cases/place-bid';

@WebSocketGateway()
export class AuctionGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly placeBid: PlaceBid) {}

  @SubscribeMessage('newBid')
  async handleNewBid(
    @MessageBody() bid: { auctionId: number; amount: number },
  ) {
    const savedBid = await this.placeBid.execute(bid.auctionId, bid.amount);
    this.server.emit('bidUpdate', savedBid);
  }
}
