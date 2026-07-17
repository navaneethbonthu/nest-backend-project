import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    categoryId: string; // Assuming you have a category relation
}