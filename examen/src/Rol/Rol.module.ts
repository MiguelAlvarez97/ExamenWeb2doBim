import {Module} from "@nestjs/common"
import {RolEntity} from "./rol.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {RolService} from "./rol.service";
import {RolController} from "./rol.controller";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([RolEntity])
        ],
        controllers:[RolController],
        providers:[RolService],
        exports:[RolService]

    }
)
export class RolModule {

}