import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { createEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,

    ) { }

    async createEvent(event: createEventDto) {

        const eventFound = await this.eventRepository.findOne({
            where: {
                name_event: event.name_event
            }
        })

        if (eventFound) {
            return new HttpException('Error for event name', HttpStatus.NOT_FOUND)
        }

        // Crea el nuevo evento con el usuario asociado
        const newEvent = this.eventRepository.create(event);

        try {
            return await this.eventRepository.save(newEvent);
        } catch (error) {
            throw new HttpException(
                'Error saving event',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
