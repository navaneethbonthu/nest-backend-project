import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {


  constructor(private prismaService: PrismaService) { }


  async create(data: any) {
    return await this.prismaService.user.create({ data })
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } })
  }

  async updateRefreshToken(userId: number, token: string | null) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: { refreshToken: token }
    })
  }







}
