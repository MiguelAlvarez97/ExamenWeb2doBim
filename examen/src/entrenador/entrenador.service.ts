import {Injectable} from "@nestjs/common";
import {EntrenadorEntity} from "./entrenador.entity";
import {FindManyOptions, Repository} from "typeorm";

import {InjectRepository} from '@nestjs/typeorm';
import {UsuarioEntity} from "../usuario/usuario.entity";
import {PokemonEntity} from "../pokemon/pokemon.entity";

@Injectable()
export class EntrenadorService {
    // Inyectar Dependencias
    constructor(
        @InjectRepository(EntrenadorEntity)
        private readonly _entrenadorRepository: Repository<EntrenadorEntity>,
    ) {
    }


    async crear(nuevoEntrenador: Entrenador): Promise<EntrenadorEntity> {

        // Instanciar una entidad -> .create()
        const entrenadorEntity = this._entrenadorRepository
            .create(nuevoEntrenador);

        // Guardar una entidad en la BDD -> .save()
        const entrenadorCreado = await this._entrenadorRepository
            .save(entrenadorEntity);

        return entrenadorCreado;
    }

    buscar(parametros?:FindManyOptions):Promise<EntrenadorEntity[]>{
        return this._entrenadorRepository.find(parametros)
    }


}

export interface Entrenador {
    id?:number;
    nombreEntrenador:string;
    apellidoEntrenador
    fecha_nacimiento:string;
    numeroMedallas:number;
    campeon:boolean;
    usuario?:UsuarioEntity,
    pokemones?:PokemonEntity[]
}

