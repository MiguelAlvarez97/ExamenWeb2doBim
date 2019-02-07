import {Module} from "@nestjs/common"
import {UsuarioEntity} from "./usuario.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";
import {RolEntity} from "../rol/rol.entity";
import {RolService} from "../rol/rol.service";
import {RolController} from "../rol/rol.controller";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([UsuarioEntity]),
            TypeOrmModule.forFeature([RolEntity])
        ],
        controllers:[UsuarioController,RolController],
        providers:[UsuarioService,RolService],
        exports:[UsuarioService,RolService]

    }
)
export class UsuarioModule {

}