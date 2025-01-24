import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
// import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { EventsController } from './events.controller';
import { Event } from './event.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Event, User]),
    ],
    providers: [
        EventsService,
    ],
    controllers: [EventsController],
})
export class EventsModule { }
