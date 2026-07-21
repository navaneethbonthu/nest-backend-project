import { IsEmail, IsNotEmpty, isString, IsString, MinDate, MinLength } from "class-validator";


export class SigninDto {


    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'password must be atleast 3 charectors long ' })
    password: string


    @IsString()
    @IsNotEmpty()
    name: string

}