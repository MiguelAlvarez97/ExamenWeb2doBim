import {Entity, ManyToMany, JoinTable, OneToMany} from "typeorm";
import {Column,PrimaryGeneratedColumn} from "typeorm";
import {RolEntity} from "../rol/rol.entity";
import {EntrenadorEntity} from "../entrenador/entrenador.entity";

@Entity('usuario')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombre:string;
    @Column()
    correo:string;
    @Column()
    password:string;
    @Column()
    fecha_nacimiento:string;
    @OneToMany(
        type => EntrenadorEntity,
        // @ts-ignore
        entrenador => entrenador.usuario
    )
    entrenadores:EntrenadorEntity[];


    @ManyToMany(type => RolEntity)
    @JoinTable()
    roles:RolEntity[];
}

