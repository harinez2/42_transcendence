import { INestApplication, Injectable, OnModuleInit,
  NotFoundException, BadRequestException,
  RequestTimeoutException, NotImplementedException,
  InternalServerErrorException,
  HttpException } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  handleError(e: any): any {
    const c_red = '\x1b[31m';
    const c_default = '\x1b[39m';

    if (e instanceof HttpException) {
      console.error(`${c_red}HttpException${c_default}`);
      this.printConsole(e);
      return e;
    }

    let exception;
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`${c_red}Prisma error: ${e.code}${c_default}`, e.message);
      console.error("meta:", e.meta);
      exception = this.handleKnownRequestError(e);

    } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error(`${c_red}Prisma unknown error${c_default}`, e.message);
      exception = new BadRequestException();

    } else if (e instanceof Prisma.PrismaClientRustPanicError) {
      console.error(`${c_red}Prisma FATAL error${c_default}`, e.message);
      exception = new BadRequestException();

    } else if (e instanceof Prisma.PrismaClientInitializationError) {
      console.error(`${c_red}Prisma init error: ${e.errorCode}${c_default}`, e.message);
      exception = new BadRequestException();

    } else if (e instanceof Prisma.PrismaClientValidationError) {
      console.error(`${c_red}Prisma validation error${c_default}`, e.message);
      exception = new BadRequestException();

    } else {
      console.error(`${c_red}Unhandled error${c_default}\n`, e);
      exception = new InternalServerErrorException();
    }
    this.printConsole(exception);
    return exception;
  }

  private handleKnownRequestError(e: any): any {
    switch (e.code) {
      case 'P2015': // 関連レコードが見つからない
      case 'P2018': // レコードが見つからない
      case 'P2021': // テーブルが見つからない
      case 'P2022': // カラムが見つからない
      case 'P2025': // レコードが見つからない
        return new NotFoundException(e.meta.cause);
        break;

      case 'P2024': // コネクションプールから新規コネクション取得タイムアウト
        return new RequestTimeoutException(e.meta.cause);
        break;

      case 'P2026': // 未サポート機能
        return new NotImplementedException(e.meta.cause);
        break;

      case 'P2028': // トランザクションAPIエラー
      case 'P2034': // コンフリクトorデッドロックによる書き込み失敗
        return new InternalServerErrorException(e.meta.cause);
        break;

      default:
        // リクエスト内容の不正に起因する例外
        return new BadRequestException(e.meta.cause);
        break;
    }
  }

  private printConsole(e: HttpException) {
    console.error(e.getStatus(), e.message);
    console.error(e.getResponse());
  }
}
