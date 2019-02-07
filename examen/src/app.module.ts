import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario/usuario.entity";
import {PokemonEntity} from "./pokemon/pokemon.entity";
import {EventoEntity} from "./evento/evento.entity";
import {ComidaEntity} from "./entrenador/comida.entity";
import {RolEntity} from "./rol/rol.entity";
import {UsuarioModule} from "./usuario/usuario.module";
import {ComidaModule} from "./entrenador/comida.module";
import {EventoModule} from "./evento/evento.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(
          {
              type: 'mysql',
              host: '192.168.99.100',
              port: 32781,
              database: 'entrenador',
              username: 'edison',
              password: '123456',
              synchronize: true,
              dropSchema: false,
                entities:[
                    UsuarioEntity,
                    PokemonEntity,
                    EventoEntity,
                    ComidaEntity,
                    RolEntity
                ],
          }),
          UsuarioModule,
          ComidaModule,
          EventoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
