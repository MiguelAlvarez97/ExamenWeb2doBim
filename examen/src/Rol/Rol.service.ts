import {Injectable,Inject} from "@nestjs/common";
import {RolEntity} from "./rol.entity";
import {Repository} from "typeorm";
import {FindManyOptions} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {UsuarioEntity} from "../usuario/usuario.entity";

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(RolEntity)
        private readonly _rolRepository:Repository<RolEntity>
    ){}

    buscar(parametros?:FindManyOptions):Promise<RolEntity[]>{
        return this._rolRepository.find(parametros)
    }

    buscarPorId(id: number): Promise<RolEntity> {
        return this._rolRepository.findOne(id );
    }

}


export interface Rol {
    id?:number;
    nombre:string;
}