import {
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  @WebSocketServer()
  server: Server;
  clients: Socket[] = [];

  // 接続時
  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`socket connected: ${client.id}`);

    // clientsに追加
    this.clients.push(client);
  }

  // 切断時
  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`socket disconnected: ${client.id}`);

    // clientsから削除
    const indexToRemove: number = this.clients.indexOf(client);
    if (indexToRemove !== -1) this.clients.splice(indexToRemove, 1);
  }
}
