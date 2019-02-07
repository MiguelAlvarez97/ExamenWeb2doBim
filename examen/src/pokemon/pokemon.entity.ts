import {Entity, ManyToMany, ManyToOne} from "typeorm";
import {PrimaryGeneratedColumn,Column, OneToMany} from "typeorm";
import {EntrenadorEntity} from "../entrenador/entrenador.entity";
import {EventoEntity} from "../evento/evento.entity";


@Entity('pokemon')
export class PokemonEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    numeroPokemon:number;
    @Column()
    nombrePokemon:string;
    @Column()
    tipoPokemon:string;
    @Column()
    nivel:number;
    @Column()
    poderEspecial1:string;
    @Column()
    poderEspecial2:string;
    @Column()
    fecha_captura:string;
    @ManyToOne(
        type => EntrenadorEntity,
        // @ts-ignore
        entrenador => entrenador.pokemones
    )
    entrenador:EntrenadorEntity;
    @ManyToMany(type => EventoEntity, evento => evento.pokemones)
    eventos: EventoEntity[];
}