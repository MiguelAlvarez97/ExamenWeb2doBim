import {Module} from "@nestjs/common"
import {ComidaEntity} from "./comida.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {ComidaService} from "./comida.service";
import {ComidaController} from "./comida.controller";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([ComidaEntity])
        ],
        controllers:[ComidaController],
        providers:[ComidaService],
        exports:[ComidaService]

    }
)
export class ComidaModule {

}