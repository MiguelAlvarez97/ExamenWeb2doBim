import {Entity, ManyToOne} from "typeorm";
import {PrimaryGeneratedColumn,Column, OneToMany} from "typeorm";
import {IngredienteEntity} from "../ingrediente/ingrediente.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";


@Entity('comida')
export class ComidaEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombrePlato:string;
    @Column()
    descripcionPlato:string;
    @Column()
    nacionalidad:string;
    @Column()
    numeroPersonas:string;
    @Column()
    picante:boolean;
    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.comidas
    )
    usuario:UsuarioEntity;

    @OneToMany(
        type => IngredienteEntity,
        // @ts-ignore
        ingrediente => ingrediente.comidas
    )
    ingredientes:IngredienteEntity[];
}