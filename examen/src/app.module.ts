import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario/usuario.entity";
import {PokemonEntity} from "./pokemon/pokemon.entity";
import {EventoEntity} from "./evento/evento.entity";
import {EntrenadorEntity} from "./entrenador/entrenador.entity";
import {RolEntity} from "./rol/rol.entity";
import {UsuarioModule} from "./usuario/usuario.module";
import {EntrenadorModule} from "./entrenador/entrenador.module";
import {EventoModule} from "./evento/evento.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(
          {
              type: 'mysql',
              host: '192.168.99.100',
              port: 32791,
              database: 'entrenador',
              username: 'examen',
              password: '123456',
              synchronize: true,
              dropSchema: false,
                entities:[
                    UsuarioEntity,
                    PokemonEntity,
                    EventoEntity,
                    EntrenadorEntity,
                    RolEntity
                ],
          }),
          UsuarioModule,
          EntrenadorModule,
          EventoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
