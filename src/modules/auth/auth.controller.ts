import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('signin')
    signin(@Body() signuinDto: any) {
        console.log('signin called')
        return this.authService.signIn(signuinDto)
    }
    @Post('login')
    login(@Body() loginDto: any) {
        return this.authService.login(loginDto)
    }

}


