import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3308,
        // Usuario y contraseña para ingresar al mysql por medio de Heidi
        username: 'root',
        password: '12345',
        // Este database es la base de datos en la que se va a estar creardo la tabla
        database: 'RegisterEventSystem',
        // Para que todos los archivos del proyecto que contengan entity.ts se ejecute
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // Pára que Sincronice
        synchronize: true,
    }), UsersModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule { }
