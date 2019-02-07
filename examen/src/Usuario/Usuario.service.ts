import {Inject, Injectable} from "@nestjs/common";
import {UsuarioEntity} from "./usuario.entity";
import {Repository} from "typeorm";
import {FindManyOptions} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {RolModule} from "../rol/rol.module";
import {RolEntity} from "../rol/rol.entity";


@Injectable()
export class UsuarioService {
    // Inyectar Dependencias
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>,
    ) {
    }

    buscar(parametros?: FindManyOptions<UsuarioEntity>)
        : Promise<UsuarioEntity[]> {
        return this._usuarioRepository.find(parametros);
    }

    buscarPorId(id: number): Promise<UsuarioEntity> {
        return this._usuarioRepository.findOne(id, {relations: ["roles"]} );
    }

    async crear(nuevoUsuario: Usuario): Promise<UsuarioEntity> {

        // Instanciar una entidad -> .create()
        const usuarioEntity = this._usuarioRepository
            .create(nuevoUsuario);

        // Guardar una entidad en la BDD -> .save()
        const usuarioCreado = await this._usuarioRepository
            .save(usuarioEntity);

        return usuarioCreado;
    }


    async login(correo: string, password: string)
        : Promise<number> {
        // 1) Buscar al usuario por username
        // 2) Comparar si el password es igual al password

        const usuarioEncontrado = await this._usuarioRepository
            .findOne({
                where: {
                    correo: correo
                }
            });
        if(usuarioEncontrado){
            if(usuarioEncontrado.password === password){
                return usuarioEncontrado.id
            }else {
                return 0
            }
        }else {
            return 0
        }
    }

    actualizar(id: number,
               nuevoUsuario: Usuario): Promise<UsuarioEntity> {

        nuevoUsuario.id = id;

        const usuarioEntity = this._usuarioRepository.create(nuevoUsuario);

        return this._usuarioRepository.save(usuarioEntity);
    }




    borrar(idUsuario: number): Promise<UsuarioEntity> {

        // CREA UNA INSTANCIA DE LA ENTIDAD
        const usuarioEntityAEliminar = this._usuarioRepository
            .create({
                id: idUsuario
            });


        return this._usuarioRepository.remove(usuarioEntityAEliminar)
    }


}

export interface Usuario {
    id?: number;
    nombre: string;
    correo: string;
    password: string;
    fecha_nacimiento:string;
    roles:RolEntity[];
}

