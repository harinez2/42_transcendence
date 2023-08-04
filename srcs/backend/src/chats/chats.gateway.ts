import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
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
    if (indexToRemove !== -1)
      this.clients.splice(indexToRemove, 1);
  }

  // 過去のチャットログをDBから取得
  @SubscribeMessage('getPastMessages')
  async handleGetPastMessages(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const posts = await this.prisma.chatMessages.findMany({
      where: { channelId: data.channelId },
    });
    for (let post of posts) {
      client.emit('message', post);
    }
  }

  // messageイベント受信
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: MessageDto) {
    console.log(`channelId: ${data.channelId}, sender: ${data.sender}, ` +
      `content: ${data.content}`);
    this.broadcast('message', data);

    // DBに保存
    await this.prisma.chatMessages.create({
      data: {
        channelId: data.channelId,
        sender: data.sender,
        content: data.content,
        createdAt: new Date(),
      },
    });
  }

  private broadcast(event: string, data: MessageDto) {
    for (let c of this.clients) {
      c.emit(event, data);
    }
  }

}
