import {Module} from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm';

import {IngredienteEntity} from "./ingrediente.entity";
import {IngredienteService} from "./ingrediente.service";
import {IngredienteController} from "./ingrediente.controller";

@Module({
    imports:[TypeOrmModule.forFeature([IngredienteEntity])],
    controllers:[IngredienteController],
    providers:[IngredienteService],
    exports:[IngredienteService]
})
export class IngredienteModule {
    
}