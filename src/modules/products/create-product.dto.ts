import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    name: string;
    price: number;
    stockQuantity: number;
    categoryId: string; // Assuming you have a category relation

}