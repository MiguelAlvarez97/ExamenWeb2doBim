import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {rolUsuarioEntity} from "../RolesPorUsuario/RolesPorUsuario.entity";

@Entity('usuario')
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    idUsr: number;

    @Column({
        name: 'nombre_usuario',
        type: 'varchar',
        length: 40
    })
    nombre: string;

    @Column({
        name: 'apellido_usuario',
        type: 'varchar',
        length: 40
    })
    apellido: string;

    @Column({
        name: 'e-mail',
        type: 'varchar',
        length: 30
    })
    email: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 20
    })
    password: string;

    @OneToMany(
        type => rolUsuarioEntity,  // Que tabla vamos a relacionar
        rolUsuario => rolUsuario.roles  // Campo que hace referencia FK
    )
    rolUsr: rolUsuarioEntity[];
}