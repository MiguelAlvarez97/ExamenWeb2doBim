import {Module} from "@nestjs/common";
import{UsuarioController} from "./Usuario.controller";
import {UsuarioService} from "./Usuario.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from "./Usuario.entity";


@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                UsuarioEntity
            ])
    ],
    controllers: [
        UsuarioController
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        UsuarioService
    ]
})
export class UsuarioModule {
}