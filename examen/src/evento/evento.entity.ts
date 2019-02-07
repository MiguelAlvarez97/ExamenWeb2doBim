import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {PokemonEntity} from "../pokemon/pokemon.entity";


@Entity('evento')
export class EventoEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombre:string;
    @Column()
    fecha:string;
    @Column()
    latitud:number;
    @Column()
    longitud:number;
    @ManyToMany(type => PokemonEntity)
    @JoinTable({
        name: "evento_pokemones", // table name for the junction table of this relation
        joinColumn: {
            name: "evento",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "pokemon",
            referencedColumnName: "id"
        }
    })
    pokemones:PokemonEntity[];
}
