import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatsGateway {
  constructor(private prisma: PrismaService) {}

  @WebSocketServer()
  server: Server;
  clients: Socket[] = [];

  // 接続時
  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`connected: ${client.id}`);

    // clientsに追加
    this.clients.push(client);
  }

  // 切断時
  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`disconnected: ${client.id}`);

    // clientsから削除
    const indexToRemove: number = this.clients.indexOf(client);
    if (indexToRemove !== -1) this.clients.splice(indexToRemove, 1);
  }

  // 過去のチャットログをDBから取得
  @SubscribeMessage('getPastMessages')
  async handleGetPastMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    try {
      const posts = await this.prisma.chatMessages.findMany({
        where: { channelId: data.channelId },
      });
      for (const post of posts) {
        client.emit('message', post);
      }
    } catch (e) {
      throw new WsException(e.message);
    }
  }

  // messageイベント受信
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: MessageDto) {
    try {
      console.log(
        `channelId: ${data.channelId}, senderId: ${data.senderId}, ` +
          `content: ${data.content}`,
      );

      // メッセージをブロードキャスト
      this.broadcast('message', data);

      // DBに保存
      await this.prisma.chatMessages.create({
        data: {
          channelId: data.channelId,
          senderId: data.senderId,
          content: data.content,
          createdAt: new Date(),
        },
      });
    } catch (e) {
      throw new WsException(e.message);
    }
  }

  //-------------------------------------------------------------------------

  private broadcast(event: string, data: MessageDto) {
    for (const c of this.clients) {
      c.emit(event, data);
    }
  }
}
