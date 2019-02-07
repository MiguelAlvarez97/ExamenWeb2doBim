import {Inject, Injectable} from "@nestjs/common";
import {PokemonEntity} from "./pokemon.entity";
import {Column, PrimaryGeneratedColumn, Repository} from "typeorm";
import {FindManyOptions} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {EntrenadorEntity} from "../entrenador/entrenador.entity";
import {RolEntity} from "../rol/rol.entity";


@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(PokemonEntity)
        private readonly _pokemonRepository:Repository<PokemonEntity>
    ){
    }

    async crear(nuevoPokemon:Pokemon):Promise<PokemonEntity> {
        const pokemonEntity = this._pokemonRepository.create(nuevoPokemon);
        const pokemonCreado = this._pokemonRepository.save(pokemonEntity);
        return pokemonCreado;
    }

    buscar(parametros?:FindManyOptions):Promise<PokemonEntity[]>{
        return this._pokemonRepository.find(parametros)
    }

    buscarPorId(id: number): Promise<PokemonEntity> {
        return this._pokemonRepository.findOne(id );
    }


}

export interface Pokemon {
    id?:number;
    numeroPokemon:number;
    nombrePokemon:string;
    tipoPokemon:string;
    nivel:number;
    poderEspecial1:string;
    poderEspecial2:string;
    fecha_captura:string;

    entrenador:EntrenadorEntity;
}