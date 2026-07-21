import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import Joi from 'joi';
import { CONFIG_KEYS } from './common/constants/config.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      // 1. Determine which file to load
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,

      // 2. Make it available globally so you don't have to import it in every module
      isGlobal: true,

      // 3. Validate your environment variables (Highly Recommended)
      validationSchema: Joi.object({
        [CONFIG_KEYS.NODE_ENV]: Joi.string().valid('development', 'production', 'test', 'staging').default('development'),
        [CONFIG_KEYS.PORT]: Joi.number().default(3000),
        [CONFIG_KEYS.DATABASE_URL]: Joi.string().required(),
        [CONFIG_KEYS.JWT_SECRET]: Joi.string().required(),
        [CONFIG_KEYS.JWT_EXPIRES_IN]: Joi.string().default('15m'),
      }),
    }),
    AuthModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    UsersModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
