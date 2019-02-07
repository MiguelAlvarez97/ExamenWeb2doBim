import {Entity, ManyToMany, ManyToOne} from "typeorm";
import {PrimaryGeneratedColumn,Column, OneToMany} from "typeorm";
import {ComidaEntity} from "../comida/comida.entity";
import {EventoEntity} from "../evento/evento.entity";


@Entity('ingrediente')
export class IngredienteEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombreIngrediente:string;
    @Column()
    cantidad:number;
    @Column()
    descripcionPreparacion:string;
    @Column()
    opcional:boolean;
    @Column()
    tipoIngrediente:string;
    @Column()
    necesitaRefrigeracion:boolean;
    @ManyToOne(
        type => ComidaEntity,
        // @ts-ignore
        comida => comida.ingredientes
    )
    comida:ComidaEntity;
    @ManyToMany(type => EventoEntity, evento => evento.ingredientes)
    eventos: EventoEntity[];
}