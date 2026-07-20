import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";
import { number } from "joi";


export class GetFilterDto {



    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Type(() => Number) // <--- Add this
    @IsNumber()
    @Min(0)
    minPrice?: number;

    @IsOptional()
    @Type(() => Number) // <--- Add this
    @IsNumber()
    @Min(0)
    maxPrice?: number;

    @IsOptional()
    @Type(() => Number) // <--- Add this
    @IsNumber()
    categoryId?: number;


}