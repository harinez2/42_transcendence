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

  @SubscribeMessage('status-add_to_online')
  handleAddToOnline(
    @ConnectedSocket() socket: Socket,
    @MessageBody() userId: number,
  ) {
    this.statusService.addToOnline(socket, userId);
  }

  @SubscribeMessage('status-switch_to_online')
  handleSwitchToOnline(@ConnectedSocket() socket: Socket) {
    this.statusService.switchToOnline(socket);
  }
}
