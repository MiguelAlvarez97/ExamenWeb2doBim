import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import{UsuarioEntity} from "./Usuario/Usuario.entity";
import {UsuarioModule} from "./Usuario/Usuario.module";
import {RolEntity} from "./Rol/Rol.entity";
import {rolUsuarioEntity} from "./RolesPorUsuario/RolesPorUsuario.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {RolModule} from "./Rol/Rol.module";
import {RolUsuarioModule} from "./RolesPorUsuario/RolesPorUsuario.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(
      {
          type: 'mysql',
          host: '192.168.99.100',
          port: 32769,
          database: 'entrenador',
          username: 'edison',
          password: '123456',
          synchronize: true,
          dropSchema: true,
          entities: [
              UsuarioEntity,
              RolEntity,
              rolUsuarioEntity
          ]
      }
  ),
  UsuarioModule,
      RolModule,
      RolUsuarioModule
  ],
  controllers: [
      AppController
  ],
  providers: [
      AppService
  ],
})
export class AppModule {}
