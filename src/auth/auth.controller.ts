import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post('register')
    register(@Body() newUser: CreateUserDto){
        if (newUser)
        return this.authService.register(newUser);
    }

    @Post('login')
    @UseGuards(AuthGuard)
    login(@Body() user: LoginDto){
        return this.authService.login(user);
    }

}
