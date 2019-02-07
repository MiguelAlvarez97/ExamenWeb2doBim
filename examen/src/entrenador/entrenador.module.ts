import {Module} from "@nestjs/common"
import {EntrenadorEntity} from "./entrenador.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {EntrenadorService} from "./entrenador.service";
import {EntrenadorController} from "./entrenador.controller";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([EntrenadorEntity])
        ],
        controllers:[EntrenadorController],
        providers:[EntrenadorService],
        exports:[EntrenadorService]

    }
)
export class EntrenadorModule {

}