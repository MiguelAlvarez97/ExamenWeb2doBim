import {Inject, Injectable} from "@nestjs/common";
import {IngredienteEntity} from "./ingrediente.entity";
import {Column, PrimaryGeneratedColumn, Repository} from "typeorm";
import {FindManyOptions} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {ComidaEntity} from "../comida/comida.entity";
import {RolEntity} from "../rol/rol.entity";


@Injectable()
export class IngredienteService {
    constructor(
        @InjectRepository(IngredienteEntity)
        private readonly _ingredienteRepository:Repository<IngredienteEntity>
    ){
    }

    async crear(nuevoIngrediente:Ingrediente):Promise<IngredienteEntity> {
        const ingredienteEntity = this._ingredienteRepository.create(nuevoIngrediente);
        const ingredienteCreado = this._ingredienteRepository.save(ingredienteEntity);
        return ingredienteCreado;
    }

    buscar(parametros?:FindManyOptions):Promise<IngredienteEntity[]>{
        return this._ingredienteRepository.find(parametros)
    }

    buscarPorId(id: number): Promise<IngredienteEntity> {
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