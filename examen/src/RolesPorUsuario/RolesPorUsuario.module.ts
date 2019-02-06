import {Module} from '@nestjs/common';
import {rolUsuarioEntity} from './RolesPorUsuario.entity';

import {TypeOrmModule} from '@nestjs/typeorm'

@Module(
    {
        imports: [
            TypeOrmModule
                .forFeature(
                    [
                        rolUsuarioEntity
                    ])
        ],
        controllers: [

        ],
        providers: [

        ],
        exports: [

        ]
    }
)

export class RolUsuarioModule {

}