import {Column, Index, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import{rolUsuarioEntity} from "../RolesPorUsuario/RolesPorUsuario.entity"

@Entity('rol')
export class RolEntity {

    @PrimaryGeneratedColumn()
    idRol: number;

    @Column()
    tipoRol: string;

    @OneToMany(
        type => rolUsuarioEntity,  // Que tabla vamos a relacionar
        rolUsuario => rolUsuario.roles  // Campo que hace referencia FK
    )
    RolesUsr: rolUsuarioEntity[];

}