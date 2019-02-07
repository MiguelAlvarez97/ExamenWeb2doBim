import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {IngredienteEntity} from "../ingrediente/ingrediente.entity";


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
    @ManyToMany(type => IngredienteEntity)
    @JoinTable({
        name: "evento_ingredientes", // table name for the junction table of this relation
        joinColumn: {
            name: "evento",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "ingrediente",
            referencedColumnName: "id"
        }
    })
    ingredientes:IngredienteEntity[];
}
