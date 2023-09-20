import {
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { StatusService } from './status/status.service';
import { GamesMatchingGateway } from './games/games.matching.gateway';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  constructor(
    private readonly statusService: StatusService,
    private readonly gamesMatchingGateway: GamesMatchingGateway,
  ) {}

  @WebSocketServer()
  server: Server;

  // 接続時
  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`socket connected: ${client.id}`);

    // リスナーの最大数を増やす
    client.setMaxListeners(20);
  }

  // 切断時
  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`socket disconnected: ${client.id}`);
    // ゲームのwaitlistから削除
    this.gamesMatchingGateway.removeFromWaitlist(client);
    // statusServiceのclientsから削除
    this.statusService.switchToOffline(client);
  }
}
