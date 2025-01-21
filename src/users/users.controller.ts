import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get('api/allUsers')
    findAll(): string {
        return 'This action returns all cats';
    }
}
