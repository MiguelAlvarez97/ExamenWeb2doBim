import {Injectable} from '@nestjs/common';
import {rolUsuarioEntity} from './RolesPorUsuario.entity';
import {FindManyOptions, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class rolUsuarioService {

    constructor(
        @InjectRepository(rolUsuarioEntity)
        private readonly _rolUsuarioRepository: Repository<rolUsuarioEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<rolUsuarioEntity>)
        : Promise<rolUsuarioEntity[]> {
        return this._rolUsuarioRepository.find(parametrosBusqueda);
    }

    buscarPorId(idRol_Usr: number) : Promise<rolUsuarioEntity> {
        return this._rolUsuarioRepository.findOne(idRol_Usr);
    }

}