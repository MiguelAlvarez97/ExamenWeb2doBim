import {Inject, Injectable} from "@nestjs/common";
import {PokemonEntity} from "./pokemon.entity";
import {Column, PrimaryGeneratedColumn, Repository} from "typeorm";
import {FindManyOptions} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {ComidaEntity} from "../entrenador/comida.entity";
import {RolEntity} from "../rol/rol.entity";


@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(PokemonEntity)
        private readonly _ingredienteRepository:Repository<PokemonEntity>
    ){
    }

    async crear(nuevoIngrediente:Ingrediente):Promise<PokemonEntity> {
        const ingredienteEntity = this._ingredienteRepository.create(nuevoIngrediente);
        const ingredienteCreado = this._ingredienteRepository.save(ingredienteEntity);
        return ingredienteCreado;
    }

    buscar(parametros?:FindManyOptions):Promise<PokemonEntity[]>{
        return this._ingredienteRepository.find(parametros)
    }

    buscarPorId(id: number): Promise<PokemonEntity> {
        return this._ingredienteRepository.findOne(id );
    }


}

export interface Ingrediente {
    id?:number;
    nombreIngrediente:string;
    cantidad:number;
    descripcionPreparacion:string;
    opcional:boolean;
    tipoIngrediente:string;
    necesitaRefrigeracion:boolean;
    comida:ComidaEntity;
}