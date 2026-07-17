import { Body, Controller, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { create } from "domain";
import { CreateProductDto } from "./create-product.dto";



@Controller('products')
export class ProductController {

    constructor(private readonly productsService: ProductsService) { }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        // Use the variable 'createProductDto' (lowercase c), NOT the class name
        return this.productsService.create(createProductDto);
    }





}


