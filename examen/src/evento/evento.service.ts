import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {EventoEntity} from "./evento.entity";
import {InjectRepository} from '@nestjs/typeorm';
import {IngredienteEntity} from "../ingrediente/ingrediente.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {Usuario} from "../usuario/usuario.service";

@Injectable()
export class EventoService {
    constructor(
        @InjectRepository(EventoEntity)
        private readonly _eventoRepository:Repository<EventoEntity>
    ){}

    buscar(parametros?:FindManyOptions<EventoEntity>):Promise<EventoEntity[]>{
        return this._eventoRepository.find(parametros)
    }

    async crear(nuevoEvento:Evento):Promise<EventoEntity>{
        const eventoEntity = this._eventoRepository.create(nuevoEvento);
        const eventoCreado = this._eventoRepository.save(eventoEntity);
        return eventoCreado
    }



    actualizar(id: number,
               nuevoUsuario: Evento): Promise<EventoEntity> {

        nuevoUsuario.id = id;

        const eventoEntity = this._eventoRepository.create(nuevoUsuario);
        return this._eventoRepository.save(eventoEntity);
    }

    buscarPorId(id: number): Promise<EventoEntity> {
        return this._eventoRepository.findOne(id, {relations: ["ingredientes"]} );
    }

}

export interface Evento {
    id?:number;
    nombre:string;
    fecha:string;
    latitud:number;
    longitud:number;
    ingredientes:IngredienteEntity[];
}