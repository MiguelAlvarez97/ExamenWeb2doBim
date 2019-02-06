import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioModule} from "./Usuario/Usuario.module";
import {UsuarioEntity} from "./Usuario/Usuario.entity";
import {RolEntity} from "./Rol/Rol.entity";
import {rolUsuarioEntity} from "./RolesPorUsuario/RolesPorUsuario.entity";

@Module({
  imports: [TypeOrmModule.forRoot(
      {
          type: 'mysql',
          host: '192.168.99.100',
          port: 32791,
          database: 'entrenador',
          username: 'edison',
          password: '123456',
          synchronize: true,
          dropSchema: true,
          entities: [
              UsuarioEntity,
              RolEntity,
              rolUsuarioEntity,
              //UsuarioEntity
          ]
      }
  ),
  UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
