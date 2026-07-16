import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    UsersModule,
    ConfigModule.forRoot({
      // 1. Determine which file to load
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,

      // 2. Make it available globally so you don't have to import it in every module
      isGlobal: true,

      // 3. Validate your environment variables (Highly Recommended)
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'staging')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        // API_TIMEOUT: Joi.number().default(5000),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
