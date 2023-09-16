import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { StatusService } from './status.service';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class StatusGateway {
  constructor(private readonly statusService: StatusService) {}

  @SubscribeMessage('status-online')
  handleOnline(
    @ConnectedSocket() socket: Socket,
    @MessageBody() userId: number,
  ) {
    this.statusService.addToOnline(socket, userId);
  }
}
