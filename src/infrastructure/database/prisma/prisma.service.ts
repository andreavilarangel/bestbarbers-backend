import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { prismaExclude } from 'prisma-exclude';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  $excludeSelectFields = prismaExclude(this);

  async enableShutdownHook(app: INestApplication): Promise<void> {
    this.$on('beforeExit', async (): Promise<void> => {
      await app.close();
    });
  }
}
