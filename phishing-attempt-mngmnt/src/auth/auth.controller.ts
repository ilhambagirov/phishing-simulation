import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public-strategy";
import { CreateUserDto } from "./models/create-user.model";

@Controller("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("/register")
    async register(@Body() request: CreateUserDto) {
        await this.authService.register(request)
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("/login")
    async login(@Body() request: CreateUserDto) {
        return await this.authService.login(request)
    }
}