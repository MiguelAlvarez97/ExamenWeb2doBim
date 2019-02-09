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
              host: 'localhost',
              port: 32775,
              database: 'entrenador',
              username: 'examen',
              password: '12345678',
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
