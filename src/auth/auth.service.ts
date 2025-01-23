
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    async register(user: CreateUserDto) {
        return await this.usersService.createUser(user)
    }

    async login({email, password}: LoginDto) {
        return await this.usersService.findOneByEmail({email, password})
    }

}
