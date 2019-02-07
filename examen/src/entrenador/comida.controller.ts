import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Comida, ComidaService} from "./comida.service";

@Controller('comida')
export class ComidaController {
    constructor(
        private readonly _comidaService:ComidaService,
        )
    {}

    @Get('registrar')
    registrarComida(
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
            'comida_registro',
            {
                esUsuario:usuario,
                esAdministrador:admin,
                titulo:"Registrar Comida"
            }
            )
    }

    @Post('registrar')
    async registrarComidaPost(
        @Res() response,
        @Session() session,
        @Body() comida: Comida,
    ){
        if(!session.usuario){
            response.redirect("/")
        }
        if(session.usuario.esAdministrador && !session.usuario.esUsuario){
            response.redirect("/")
        }

        comida.usuario = session.usuario.id;
        const comida_nueva = await this._comidaService.crear(comida);
        response.redirect("/")
    }

    @Get('listar')
    async getRoles(
    ) {
        return await this._comidaService.buscar();
    }


}