import { Test, TestingModule } from '@nestjs/testing';
import { BlockGateway } from './block.gateway';

describe('BlockGateway', () => {
  let gateway: BlockGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockGateway],
    }).compile();

    gateway = module.get<BlockGateway>(BlockGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
