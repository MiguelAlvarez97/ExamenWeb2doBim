import {Module} from '@nestjs/common';
import {RolEntity} from'./Rol.entity'
import {RolService} from './Rol.service';

import {TypeOrmModule} from '@nestjs/typeorm';
import { rolController } from './Rol.controller';



@Module(
    {
        imports: [
            TypeOrmModule
                .forFeature(
                    [
                        RolEntity
                    ])
        ],
        controllers: [
            rolController
        ],
        providers: [
            RolService
        ],
        exports: [
            RolService
        ]
    }
)

export class RolModule {

}