import {Module} from "@nestjs/common";
import {EventoService} from "./evento.service";
import {EventoEntity} from "./evento.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {EventoController} from "./evento.controller";
import {PokemonEntity} from "../pokemon/pokemon.entity";
import {PokemonController} from "../pokemon/pokemon.controller";
import {PokemonService} from "../pokemon/pokemon.service";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([EventoEntity]),
            TypeOrmModule.forFeature([PokemonEntity])
        ],
        controllers:[EventoController,PokemonController],
        providers:[EventoService,PokemonService],
        exports:[EventoService,PokemonService],
    }
)
export class EventoModule {
}