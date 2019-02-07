import {Entity, ManyToMany, JoinTable, OneToMany} from "typeorm";
import {Column,PrimaryGeneratedColumn} from "typeorm";
import {RolEntity} from "../rol/rol.entity";
import {ComidaEntity} from "../comida/comida.entity";

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
        type => ComidaEntity,
        // @ts-ignore
        comida => comida.usuario
    )
    comidas:ComidaEntity[];


    @ManyToMany(type => RolEntity)
    @JoinTable()
    roles:RolEntity[];
}

