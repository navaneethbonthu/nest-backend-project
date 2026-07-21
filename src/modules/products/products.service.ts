import { PrismaService } from "src/prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { GetFilterDto } from "./dtos/get-filter.dto";
import { Prisma } from "@prisma/client";

@Injectable()

export class ProductsService {
    constructor(private prismaService: PrismaService) { } // Inject Prisma

    async create(createProductDto: CreateProductDto) {
        try {
            const { categoryId, ...rest } = createProductDto;
            return await this.prismaService.product.create({
                data: {
                    name: rest.name,
                    price: Number(rest.price),
                    stockQuantity: Number(rest.stockQuantity),
                    category: {
                        connect: { id: Number(categoryId) }
                    }
                },
            });
        } catch (error) {
            console.log(error); // This prints the error in your terminal
            throw error; // This sends it back to Postman
        }
    }


    async findAll(filterDto: GetFilterDto) {
        const { search, minPrice, maxPrice, categoryId, limit = 10, page = 1 } = filterDto

        const skip = (page - 1) * limit

        const where: Prisma.ProductWhereInput = {
            categoryId: categoryId, // No Number() needed anymore
            price: {
                gte: minPrice,     // No Number() needed anymore
                lte: maxPrice,     // No Number() needed anymore
            },
            OR: search ? [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ] : undefined,
        }

        const [items, total] = await Promise.all([
            this.prismaService.product.findMany({
                where,
                include: { category: true },
                skip: skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            this.prismaService.product.count({
                where
            })

        ])


        return {
            data: items,
            meta: { total, page, lastPage: Math.ceil(total / limit) }
        }
    }


    async findOne(id: string) {
        const product = await this.prismaService.product.findUnique({
            where: { id: Number(id) },
            include: {
                category: true
            }
        })

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`)
        }

        return product;
    }


    async update(id: string, updateDto: UpdateProductDto) {
        await this.findOne(id)

        return await this.prismaService.product.update({
            where: { id: Number(id) },
            data: updateDto,
        })
    }

    async delete(id: string) {
        await this.findOne(id)
        return await this.prismaService.product.delete({
            where: { id: Number(id) },

        })
    }
}