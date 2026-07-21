import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONFIG_KEYS } from 'src/common/constants/config.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>(CONFIG_KEYS.JWT_SECRET)
        });
    }

    async validate(payload: any) {
        // This is what gets attached to req.user
        return { userId: payload.sub, email: payload.email, role: payload.role };
    }
}