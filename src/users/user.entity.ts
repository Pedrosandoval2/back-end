import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'users' })

export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        // Para que sea unico
        unique: true
    })
    username: string

    @Column()
    password: string

    @Column()
    country: string

    @Column({
        type: 'datetime',
        // Cada vez que vaya a crear un usuario le agregará la fecha actual
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date

    @Column({
        // Para que no siempre tenga que mandar el valor
        nullable: true
    })
    authStrategy: string
}

    // Se puede hacer esto o como el anterior, creo que la diferencia es que tengo que instalar dependencia.

// export const UserSchema = new EntitySchema<User>({
//     name: 'User',
//     target: User,
//     columns: {
//       id: {
//         type: Number,
//         primary: true,
//         generated: true,
//       },
//       firstName: {
//         type: String,
//       },
//       lastName: {
//         type: String,
//       },
//       isActive: {
//         type: Boolean,
//         default: true,
//       },
//     },
//     relations: {
//       photos: {
//         type: 'one-to-many',
//         target: 'Photo', // the name of the PhotoSchema
//       },
//     },
//   });