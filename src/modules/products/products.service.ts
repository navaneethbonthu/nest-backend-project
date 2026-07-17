import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./create-product.dto";
import { connect } from "http2";

export class ProductsService {
    constructor(private prisma: PrismaService) { } // Inject Prisma

    // create(createProductDto: CreateProductDto) {


    //     const {categoryId , ...rest} = createProductDto


    //     return ""
    // }

    // findAll() {
    //     return this.prisma.product.findMany({
    //         include: { category: true } // If you want to see the category details
    //     });
    // }

    // findOne(id: string) {
    //     return this.prisma.product.findUnique({ where: { id } });
    // }
}