import {
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { StatusService } from './status/status.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  constructor(private readonly statusService: StatusService) {}

  @WebSocketServer()
  server: Server;

  // 接続時
  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`socket connected: ${client.id}`);
  }

  // 切断時
  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`socket disconnected: ${client.id}`);

    // statusServiceのclientsから削除
    this.statusService.switchToOffline(client);
  }
}
