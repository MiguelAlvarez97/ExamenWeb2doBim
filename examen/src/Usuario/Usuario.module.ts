import {Module} from "@nestjs/common";
import {UsuarioService} from "./Usuario.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario.entity";

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                UsuarioEntity
            ])
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