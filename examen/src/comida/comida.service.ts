import {Injectable} from "@nestjs/common";
import {ComidaEntity} from "./comida.entity";
import {FindManyOptions, Repository} from "typeorm";

import {InjectRepository} from '@nestjs/typeorm';
import {UsuarioEntity} from "../usuario/usuario.entity";
import {IngredienteEntity} from "../ingrediente/ingrediente.entity";

@Injectable()
export class ComidaService {
    // Inyectar Dependencias
    constructor(
        @InjectRepository(ComidaEntity)
        private readonly _comidaRepository: Repository<ComidaEntity>,
    ) {
    }


    async crear(nuevaComida: Comida): Promise<ComidaEntity> {

        // Instanciar una entidad -> .create()
        const comidaEntity = this._comidaRepository
            .create(nuevaComida);

        // Guardar una entidad en la BDD -> .save()
        const comidaCreada = await this._comidaRepository
            .save(comidaEntity);

        return comidaCreada;
    }

    buscar(parametros?:FindManyOptions):Promise<ComidaEntity[]>{
        return this._comidaRepository.find(parametros)
    }


}

export interface Comida {
    id?:number;
    nombrePlato:string;
    descripcionPlato:string;
    nacionalidad:string;
    numeroPersonas:string;
    picante:boolean;
    usuario?:UsuarioEntity,
    ingredientes?:IngredienteEntity[]
}

