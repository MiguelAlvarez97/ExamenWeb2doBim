import {Entity, ManyToOne} from "typeorm";
import {PrimaryGeneratedColumn,Column, OneToMany} from "typeorm";
import {PokemonEntity} from "../pokemon/pokemon.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";


@Entity('entrenador')
export class EntrenadorEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombreEntrenador:string;
    @Column()
    apellidoEntrenador:string;
    @Column()
    fecha_nacimiento:string;
    @Column()
    numeroMedallas:number;
    @Column()
    campeon:boolean;
    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.entrenadores
    )
    usuario:UsuarioEntity;

    @OneToMany(
        type => PokemonEntity,
        // @ts-ignore
        pokemon => pokemon.entrenadores
    )
    pokemones:PokemonEntity[];
}