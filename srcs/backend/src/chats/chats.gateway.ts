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
import { AddMessageDto } from './dto/add-message.dto';
import { MessageDto } from './dto/message.dto';
import { NotFoundException } from '@nestjs/common';

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
    try {
      const posts = await this.prisma.chatMessages.findMany({
        where: { channelId: Number(data.channelId) },
        include: { sender: true },
      });
      for (let post of posts) {
        client.emit('message', post);
      }

    } catch(e) {
      throw new WsException(e.message);
    }
  }

  // messageイベント受信
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: AddMessageDto) {
    try {
      // ミュートされたユーザの発言の場合は例外を投げる
      const muteInfo = await this.prisma.chatMute.findUnique({
        where: {
          channelId_mutedUserId: {
            channelId: data.channelId,
            mutedUserId: data.senderId,
          },
        },
      });
      if (muteInfo && muteInfo.muteUntil > new Date()) {
        throw new WsException('Cannot send the message because the user is muted.');
      }

      console.log(`channelId: ${data.channelId}, senderId: ${data.senderId}, ` +
        `content: ${data.content}`);

      // DBに保存
      const createdMessage = await this.prisma.chatMessages.create({
        data: {
          channelId: data.channelId,
          senderId: data.senderId,
          content: data.content,
          createdAt: new Date(),
        },
      });
      // MessageDtoを作成
      const addedMessage = await this.findMessageById(createdMessage.messageId);
      // メッセージをブロードキャスト
      this.broadcast('message', addedMessage);
    } catch(e) {
      throw new WsException(e.message);
    }
  }

  //-------------------------------------------------------------------------

  private broadcast(event: string, data: MessageDto) {
    for (let c of this.clients) {
      c.emit(event, data);
    }
  }

  private async findMessageById(messageId: number): Promise<MessageDto> {
    try {
      const message: MessageDto = await this.prisma.chatMessages.findUnique({
        where: { messageId: messageId },
        include: { sender: true },
      });
      if (!message) {
        throw new NotFoundException();
      }
      return message;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

}
