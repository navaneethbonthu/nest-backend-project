import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dot";
import { SignupDto } from "./dtos/signup.dto";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('signin')
    signin(@Body() signuinDto: SignupDto) {
        console.log('signin called')
        return this.authService.signIn(signuinDto)
    }
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

}


