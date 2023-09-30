import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
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

  // chatの状態を初期化
  @SubscribeMessage('chat-reset')
  resetChatStatus(@ConnectedSocket() socket: Socket) {
    for (const room of socket.rooms) {
      if (room.startsWith('chat_')) {
        socket.leave(room);
        console.log(`left on reset: room: ${room}, socket id: ${socket.id}`);
      }
    }
  }

  // 入室
  @SubscribeMessage('chat-join')
  joinRoom(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    socket.join('chat_' + data.channelId);
    console.log(
      `joined: channelId: ${data.channelId}, socket id: ${socket.id}`,
    );
  }

  // 退室(socket切断時はleaveログが出ないがleaveしたことになっている)
  @SubscribeMessage('chat-leave')
  leaveRoom(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    socket.leave('chat_' + data.channelId);
    console.log(`left: channelId: ${data.channelId}, socket id: ${socket.id}`);
  }

  // 過去のチャットログをDBから取得
  @SubscribeMessage('chat-getPastMessages')
  async handleGetPastMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    try {
      const posts = await this.prisma.chatMessages.findMany({
        where: { channelId: Number(data.channelId) },
        include: { sender: true },
      });
      for (const post of posts) {
        client?.emit('chat-message', post);
      }
    } catch (e) {
      throw new WsException(e.message);
    }
  }

  // messageイベント受信
  @SubscribeMessage('chat-message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: AddMessageDto,
  ) {
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
        throw new WsException(
          'Cannot send the message because the user is muted.',
        );
      }

      console.log(
        `channelId: ${data.channelId}, senderId: ${data.senderId}, ` +
          `content: ${data.content}`,
      );

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
      // メッセージをブロードキャスト(自分以外)
      socket.to('chat_' + data.channelId)?.emit('chat-message', addedMessage);
      // メッセージを自分にも送信
      socket?.emit('chat-message', addedMessage);
    } catch (e) {
      throw new WsException(e.message);
    }
  }

  //-------------------------------------------------------------------------

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
