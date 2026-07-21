import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
// 1. ADD THIS IMPORT LINE:
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {


    async onModuleInit() {
        // 2. This connects to the database when the app starts
        await this.$connect();
    }

    async onModuleDestroy() {
        // 3. This closes the connection when the app stops
        await this.$disconnect();
    }
}