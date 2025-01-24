import { IsDate, IsNumber, IsString } from "class-validator";

export class createEventDto {

    @IsNumber()
    user: number

    @IsString()
    name_event: string;

    @IsString()
    description: string;

    @IsNumber()
    price_unit: number;

    @IsString()
    payment_method: string;

    @IsDate()
    start_date: Date;

    @IsDate()
    end_date: Date;
}
