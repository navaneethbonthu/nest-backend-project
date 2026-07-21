import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { log } from 'console';
import { SigninDto } from './dtos/signinDto';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }


    async signIn(signInDto: SigninDto) {
        const userExists = await this.userService.findByEmail(signInDto.email)
        if (userExists) {
            throw new BadRequestException('User already exists')
        }
        const hashedPassword = await bcrypt.hash(signInDto.password, 10)

        const user = await this.userService.create({
            ...signInDto,
            password: hashedPassword
        })

        const { password, refreshToken, ...result } = user
        return result;
    }


    async login(logInDto: any) {

        const { email, password } = logInDto

        const user = await this.userService.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const isPasswordValid = bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }


        const payload = { sub: user.id, email: user.email, role: user.role }

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        }


    }

}
