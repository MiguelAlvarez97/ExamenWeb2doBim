import {Module} from "@nestjs/common";
import {EventoService} from "./evento.service";
import {EventoEntity} from "./evento.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {EventoController} from "./evento.controller";
import {IngredienteEntity} from "../ingrediente/ingrediente.entity";
import {IngredienteController} from "../ingrediente/ingrediente.controller";
import {IngredienteService} from "../ingrediente/ingrediente.service";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([EventoEntity]),
            TypeOrmModule.forFeature([IngredienteEntity])
        ],
        controllers:[EventoController,IngredienteController],
        providers:[EventoService,IngredienteService],
        exports:[EventoService,IngredienteService],
    }
)
export class EventoModule {
}