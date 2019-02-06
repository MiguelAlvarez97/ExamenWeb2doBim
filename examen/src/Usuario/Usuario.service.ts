import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {Usuario} from "../app.controller";

//import {NoticiaEntity} from "../noticia/noticia-entity";

@Injectable()
export class UsuarioService {
     arreglo: Usuario[] = [
        {
            id: 1,
            nombre: 'A',
            apellido: 'Descripcion de a',
            email: 'string',
            password:'string',
            fechaNacimiento:'string',
        },
        {
            id: 2,
            nombre: 'A',
            apellido: 'Descripcion de a',
            email: 'string',
            password:'string',
            fechaNacimiento:'string',        },
        {
            id: 3,
            nombre: 'A',
            apellido: 'Descripcion de a',
            email: 'string',
            password:'string',
            fechaNacimiento:'string',
        }
    ];
    // Inyectar las dependencias
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>,
    ) {
    }

    buscar(parametrosBusqueda?: FindManyOptions<UsuarioEntity>)
        : Promise<UsuarioEntity[]> {
        return this._usuarioRepository.find(parametrosBusqueda);
    }

    crear(usuario: Usuario): Promise<UsuarioEntity> {

        // Metodo Create es como un CONSTRUCTOR de la ENTIDAD
        const usuarioEntity: UsuarioEntity = this._usuarioRepository
            .create(usuario);

        // Metodo Save Guarda en la BDD
        return this._usuarioRepository.save(usuarioEntity);

    }

    eliminar(idUsuario: number): Promise<UsuarioEntity> {

        const UsuarioAEliminar: UsuarioEntity = this._usuarioRepository
            .create({
                id: idUsuario
            });

        return this._usuarioRepository.remove(UsuarioAEliminar);
    }

    actualizar(nuevoUsuario: Usuario): Promise<UsuarioEntity> {

        const usuarioEntity: UsuarioEntity = this._usuarioRepository
            .create(nuevoUsuario);

        return this._usuarioRepository.save(usuarioEntity);

    }

    buscarPorId(id: number): Promise<UsuarioEntity> {
        return this._usuarioRepository.findOne(id);
    }

    async autenticar(username: string,
                     password: string): Promise<boolean> {
        // Password encriptada
        // Encriptar el passwrod que les llega

        const consulta: FindOneOptions<UsuarioEntity> = {
            where: {
                username: username,
                password: password // password encriptado
            }
        };

        const respuesta = await this._usuarioRepository.findOne(consulta);

        if (respuesta) {
            return true;
        } else {
            return false;
        }

    }

}

