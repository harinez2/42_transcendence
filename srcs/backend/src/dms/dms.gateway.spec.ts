import { Test, TestingModule } from '@nestjs/testing';
import { DmsGateway } from './dms.gateway';

describe('ChatsGateway', () => {
  let gateway: DmsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DmsGateway],
    }).compile();

    gateway = module.get<DmsGateway>(DmsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
