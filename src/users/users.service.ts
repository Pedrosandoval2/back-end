import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        // readonly Solo para poder utilizar y no modificar en otros lados que utilicemos
        private readonly userRepository: Repository<User>,

    ) { }

    async createUser(user: CreateUserDto) {

        // Validando si el usuario ya existe para hacer el manejo del error en caso ya exista
        const userFound = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        })

        if (userFound) {
            return new HttpException('User alreday exists', HttpStatus.CONFLICT)
        }
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser)
    }

    getUsers() {
        return this.userRepository.find()
    }

    async getUser(id: number) {
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if (!userFound) {
            return new HttpException('user not found', HttpStatus.CONFLICT)
        }

        return userFound
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
        return this.userRepository.save(updateUser)

    }

}

// Este hace la comunicación con la BDD