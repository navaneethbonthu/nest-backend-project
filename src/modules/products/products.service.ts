import { PrismaService } from "src/prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { GetFilterDto } from "./dtos/get-filter.dto";

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
        const { search, minPrice, maxPrice, categoryId } = filterDto

        // return await this.prismaService.product.findMany({
        //     where: {
        //         categoryId: categoryId ? Number(categoryId) : undefined,
        //         price: {
        //             gte: minPrice ? Number(minPrice) : undefined,
        //             lte: maxPrice ? Number(maxPrice) : undefined,
        //         },
        //         OR: search ? [
        //             { name: { contains: search, mode: 'insensitive' } },
        //             { description: { contains: search, mode: 'insensitive' } },
        //         ] : undefined,
        //     },
        //     include: { category: true },
        // });

        return await this.prismaService.product.findMany({
            where: {
                categoryId: categoryId, // No Number() needed anymore
                price: {
                    gte: minPrice,     // No Number() needed anymore
                    lte: maxPrice,     // No Number() needed anymore
                },
                OR: search ? [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ] : undefined,
            },
            include: { category: true },
        });
    }


    async findOne(id: string) {
        const product = this.prismaService.product.findUnique({
            where: { id: Number(id) },
            include: {
                category: true
            }
        })

        if (!product) {
            throw new NotFoundException('Product with ID ${id} not found')
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