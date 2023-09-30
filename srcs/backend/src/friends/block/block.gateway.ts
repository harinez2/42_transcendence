import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { BlockService } from './block.service';
import { DmsService } from 'src/dms/dms.service';
import { Inject, forwardRef } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BlockGateway {
  constructor(
    private readonly blockService: BlockService,
    @Inject(forwardRef(() => DmsService))
    private readonly dmsService: DmsService,
  ) {}

  @SubscribeMessage('block-user')
  async blockUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ): Promise<any> {
    try {
      // DMチャンネルからleaveする
      const channel = await this.dmsService.findBTwoUserId(
        data.blockerId,
        data.blockedId,
      );
      socket.leave('dm_' + channel.channelId);
    } catch (e) {}

    let err = '';
    let setblock;
    try {
      // DBにblock情報を書きこむ
      setblock = await this.blockService.setBlock(
        data.blockerId,
        data.blockedId,
      );
    } catch (e) {
      err = e.message;
    }
    socket.emit('block-user-response', {
      err: err,
    });
    return setblock;
  }
}
