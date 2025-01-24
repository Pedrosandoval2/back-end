
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'events' })
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name_event: string;

    @Column()
    description: string;

    @Column({ nullable: false, type: 'decimal' })
    price_unit: number;

    @Column({ nullable: false, type: 'datetime' })
    start_date: Date;

    @Column({ nullable: false, type: 'datetime' })
    end_date: Date;

    @Column()
    payment_method: string;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column()
    user: number
}
