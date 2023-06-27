import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const prismaServiceMock = {
      // PrismaClientのメソッドをモック化
      user: {
        findAll: jest.fn().mockResolvedValue([
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
        ]),

        findUnique: jest.fn().mockImplementation((params) => {
          if (params.where.id === 1) {
            return Promise.resolve({
              id: 1,
              name: 'John Doe',
              email: 'john@example.com',
            });
          } else {
            return Promise.resolve(null);
          }
        }),
      },

      // PrismaServiceのメソッドをモック化（必要に応じて）
      enableShutdownHooks: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
