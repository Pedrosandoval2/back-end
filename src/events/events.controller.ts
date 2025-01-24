import { Body, Controller, Param, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { createEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {

    constructor(
        private readonly eventsService: EventsService
    ){}

    @Post('create/:id')
    create(
        @Body() event: createEventDto
    ){
        return this.eventsService.createEvent(event)
    }
}
