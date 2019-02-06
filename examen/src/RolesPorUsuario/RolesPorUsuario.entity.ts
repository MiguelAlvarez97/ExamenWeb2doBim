import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RolEntity} from "../Rol/Rol.entity";
import {UsuarioEntity} from "../Usuario/Usuario.entity";

@Entity('rolUsuario')
export class rolUsuarioEntity {

    @PrimaryGeneratedColumn()
    idRol_Usr:number;

    @Column({
        name: 'id-usuario',
        type: 'varchar',
        length: 40
    })
    idUsr: string;

    @Column({
        name: 'id-rol',
        type: 'varchar',
        length: 40
    })
    idRol: string;
/*
    @OneToMany(
        type => RolEntity,  // Tipo tabla
        rol => rol.RolesUsr
    )
    roles: RolEntity[];

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.rolUsr
    )
    usuarios: UsuarioEntity[]
*/
}