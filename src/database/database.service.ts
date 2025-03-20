/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  private _originalClient: any;

  toJSON() {
    const { _originalClient, ...rest } = this;
    return rest;
  }

  async onModuleInit() {
    await this.$connect();
  }
}
