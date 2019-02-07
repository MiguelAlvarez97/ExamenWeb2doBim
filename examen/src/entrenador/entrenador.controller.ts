import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Entrenador, EntrenadorService} from "./entrenador.service";

@Controller('entrenador')
export class EntrenadorController {
    constructor(
        private readonly _entrenadorService:EntrenadorService,
        )
    {}

    @Get('registrar')
    registrarEntrenador(
        @Res() response,
        @Session() session
    )
    {   let admin = undefined
        let usuario = undefined
        if(!session.usuario){
            response.redirect("/")
        }
        if(session.usuario.esUsuario){
            usuario = true;
        }
        if(session.usuario.esAdministrador && !session.usuario.esUsuario){
            response.redirect("/")
        }
        if(session.usuario.esAdministrador){
            admin = true
        }
        response.render(
            'entrenador_registro',
            {
                esUsuario:usuario,
                esAdministrador:admin,
                titulo:"Registrar Entrenador"
            }
            )
    }

    @Post('registrar')
    async registrarEntrenadorPost(
        @Res() response,
        @Session() session,
        @Body() entrenador: Entrenador,
    ){
        if(!session.usuario){
            response.redirect("/")
        }
        if(session.usuario.esAdministrador && !session.usuario.esUsuario){
            response.redirect("/")
        }

        entrenador.usuario = session.usuario.id;
        const entrenador_nuevo = await this._entrenadorService.crear(entrenador);
        response.redirect("/")
    }

    @Get('listar')
    async getRoles(
    ) {
        return await this._entrenadorService.buscar();
    }


}