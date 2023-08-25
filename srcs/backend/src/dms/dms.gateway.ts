import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddMessageDto } from '../chats/dto/add-message.dto';
import { MessageDto } from '../chats/dto/message.dto';
import { NotFoundException } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DmsGateway {
  constructor(private prisma: PrismaService) {}

  // 入室
  @SubscribeMessage('dm-join')
  joinRoom(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    socket.join('dm_' + data.channelId);
    console.log(
      `joined: channelId: ${data.channelId}, socket id: ${socket.id}`,
    );
  }

  // 退室(socket切断時はleaveログが出ないがleaveしたことになっている)
  @SubscribeMessage('dm-leave')
  leaveRoom(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    socket.leave('dm_' + data.channelId);
    console.log(
      `leaved: channelId: ${data.channelId}, socket id: ${socket.id}`,
    );
  }

  // 過去のチャットログをDBから取得
  @SubscribeMessage('dm-getPastMessages')
  async handleGetPastMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    try {
      const posts = await this.prisma.dmMessages.findMany({
        where: { channelId: Number(data.channelId) },
        include: { sender: true },
      });
      for (const post of posts) {
        client.emit('dm-message', post);
      }
    } catch (e) {
      throw new WsException(e.message);
    }
  }

  // messageイベント受信
  @SubscribeMessage('dm-message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: AddMessageDto,
  ) {
    try {
      console.log(
        `channelId: ${data.channelId}, senderId: ${data.senderId}, ` +
          `content: ${data.content}`,
      );

      // DBに保存
      const createdMessage = await this.prisma.dmMessages.create({
        data: {
          channelId: data.channelId,
          senderId: data.senderId,
          content: data.content,
          createdAt: new Date(),
        },
      });
      // MessageDtoを作成
      const addedMessage = await this.findMessageById(createdMessage.messageId);
      // メッセージをブロードキャスト(自分以外)
      socket.to('dm_' + data.channelId).emit('dm-message', addedMessage);
      // メッセージを自分にも送信
      socket.emit('dm-message', addedMessage);
    } catch (e) {
      throw new WsException(e.message);
    }
  }

  //-------------------------------------------------------------------------

  private async findMessageById(messageId: number): Promise<MessageDto> {
    try {
      const message: MessageDto = await this.prisma.dmMessages.findUnique({
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
