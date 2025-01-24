import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bycryptjs from 'bcryptjs';
import { hasSpaces } from './util/hasSpaces';
import { LoginDto } from 'src/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        // readonly Solo para poder utilizar y no modificar en otros lados que utilicemos
        private readonly userRepository: Repository<User>,
        private readonly jwtServise: JwtService

    ) { }

    /******************************** Login ************************************/

    async register({ email, password, username }: CreateUserDto) {
        // Validando si el usuario ya existe para hacer el manejo del error en caso ya exista
        const userFound = await this.userRepository.findOne({
            where: {
                username
            }
        })

        if (userFound && userFound.email === email) {
            return new HttpException('User alreday exists', HttpStatus.CONFLICT)
        }

        if (hasSpaces(password)) {
            return new HttpException('Error in password', HttpStatus.CONFLICT)
        }

        const payload = { email };

        const access_token = await this.jwtServise.signAsync(payload)

        const newUser = this.userRepository.create({
            email,
            password: await bycryptjs.hash(password, 12),
            username
        });
        this.userRepository.save(newUser)

        return {
            access_token,
            user: {
                id: newUser.id,
                username,
                email,
            }
        }
    }

    async signIn({ email, password }: LoginDto) {
        const userFound = await this.userRepository.findOneBy({ email })

        if (!userFound) {
            return new HttpException('user not found', HttpStatus.CONFLICT)
        }

        if (hasSpaces(password)) {
            return new HttpException('password does not match', HttpStatus.CONFLICT)
        }

        const payload = { email };

        const access_token = await this.jwtServise.signAsync(payload)

        return {
            access_token,
            user: {
                id: userFound.id,
                email,
                username: userFound.username,
            }
        }
    }

    /******************************** Usuario ************************************/

    async getUser(id: number) {
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if (!userFound) {
            return new HttpException('user not found', HttpStatus.CONFLICT)
        }

        return {
            id,
            username: userFound.username,
            email: userFound.email,
        }
    }

    async deleteUser(id: number) {
        const result = await this.userRepository.delete({ id })

        if (result.affected === 0) {
            return new HttpException('user not found', HttpStatus.NOT_FOUND)
        }

        return result;
    }

    async updateUser(id: number, user: UpdateUserDto) {
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if (!userFound) {
            return new HttpException('user not found', HttpStatus.NOT_FOUND)
        }

        // Lo que hace es que primero es el objeto que encontró y segundo los cambios que está recibiendo para
        // así remmplazar al principal y luego guardarlo y retornar
        const updateUser = Object.assign(userFound, user)
        this.userRepository.save(updateUser)
        return {
            username: updateUser.username,
            email: updateUser.email,
        }
    }

}

// Este hace la comunicación con la BDD