import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./create-product.dto";
import { connect } from "http2";
import { date, number } from "joi";

export class ProductsService {
    constructor(private prismaService: PrismaService) { } // Inject Prisma

    async create(dto: CreateProductDto) {

        return this.prismaService.product.create({
            data: {
                name: dto.name,
                price: dto.price,
                stockQuantity: dto.stockQuantity,
                category: {
                    connect: { id: Number(dto.categoryId) }
                }
            }
        })

    }
}