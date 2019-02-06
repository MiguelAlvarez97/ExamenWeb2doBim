import {Injectable} from "@nestjs/common";
import {Rol} from '../app.controller';
import {RolEntity} from './rol.entity';
import {FindManyOptions, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class RolService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly _rolRepository : Repository<RolEntity>
    ){}

    buscarRol(parametrosBusqueda?: FindManyOptions<RolEntity>)
        : Promise<RolEntity[]> {
        return this._rolRepository.find(parametrosBusqueda);
    }

    crearRol(rol: Rol) : Promise<RolEntity> {
        const rolEntity : RolEntity = this._rolRepository
            .create(rol);
        return this._rolRepository.save(rolEntity);
    }

    eliminarRol(rolId: number) : Promise<RolEntity> {
        const rolEliminar : RolEntity = this._rolRepository
            .create({
                rolId: rolId
            });
        return this._rolRepository.remove(rolEliminar)
    }

    actualizarRol(nuevoRol: Rol) : Promise<RolEntity> {
        const rolEntity: RolEntity = this._rolRepository
            .create(nuevoRol);
        return this._rolRepository.save(rolEntity);
    }

    buscarPorIdRol(rolId: number) : Promise<RolEntity> {
        return this._rolRepository.findOne(rolId);
    }

}