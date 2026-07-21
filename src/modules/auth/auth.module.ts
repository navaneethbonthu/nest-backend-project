import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG_KEYS } from 'src/common/constants/config.constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // 1. Use getOrThrow to ensure the app doesn't start without a secret
        secret: configService.getOrThrow<string>(CONFIG_KEYS.JWT_SECRET),
        signOptions: {
          // 2. Use 'as any' or a fallback string to satisfy the strict type check
          expiresIn: (configService.get<string>(CONFIG_KEYS.JWT_EXPIRES_IN) || '15m') as any,
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {


}
