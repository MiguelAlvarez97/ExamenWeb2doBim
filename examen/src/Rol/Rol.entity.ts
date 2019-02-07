import {Entity, OneToMany, ManyToMany, JoinTable} from "typeorm";
import {Column,PrimaryGeneratedColumn} from "typeorm";

@Entity('rol')
export class RolEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombre:string;
}