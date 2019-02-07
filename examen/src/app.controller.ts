import {BadRequestException, Body, Controller, Get, Post, Query, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {Usuario, UsuarioService} from "./usuario/usuario.service";
import {RolService} from "./rol/rol.service";
import {EventoService} from "./evento/evento.service";
import {Like} from "typeorm";
import {EventoEntity} from "./evento/evento.entity";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly _usuarioService:UsuarioService,
      private readonly _rolService:RolService,
      private readonly _eventoService:EventoService,
  ) {}

  @Get()
  async getHello(
      @Res() response,
      @Session() session,
      @Query('busqueda')busqueda
  ){
      let admin =undefined;
      let esUsuario=undefined;
      if (session.usuario){
          if(session.usuario.esUsuario){
              esUsuario=true;
          }
          if(session.usuario.esAdministrador){
              admin =true
          }
      }
      let eventos : EventoEntity[];
      if(busqueda){
          const consulta = {
              where: [
                  {
                      nombre: Like(`%${busqueda}%`)
                  }
              ]
          };
          eventos = await this._eventoService.buscar(consulta);
      }else {
          eventos = await this._eventoService.buscar();
      }

      console.log(session.usuario,);
    response.render('inicio',{esUsuario:esUsuario,esAdministrador:admin,eventos:eventos})
  }


}



