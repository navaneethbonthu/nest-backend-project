import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  constructor(private prisma: PrismaService) { }

  // async getAllUsers() {
  //   return this.prisma.user.findMany({
  //     include: { posts: true }, // This is the power of Prisma!
  //   });
  // }

  // async createUser(data: { name: string; email: string }) {
  //   return this.prisma.user.create({ data });
  // }
}
