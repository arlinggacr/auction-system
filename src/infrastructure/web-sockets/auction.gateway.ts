import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AuctionGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('placeBid')
  handlePlaceBid(
    @MessageBody() data: { auctionId: string; bidAmount: number },
  ) {
    this.server.emit('bidPlaced', data);
  }
}
