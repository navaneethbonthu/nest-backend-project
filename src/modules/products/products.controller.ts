import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { create } from "domain";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { CreateProductDto } from "./dtos/create-product.dto";
import { GetFilterDto } from "./dtos/get-filter.dto";




@Controller('products')
export class ProductController {

    constructor(private readonly productsService: ProductsService) { }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        // Use the variable 'createProductDto' (lowercase c), NOT the class name
        return this.productsService.create(createProductDto);
    }


    @Get()
    findAll(@Query() filterDto: GetFilterDto) {
        return this.productsService.findAll(filterDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id)
    }


    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(id, updateProductDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.productsService.delete(id)
    }







}


