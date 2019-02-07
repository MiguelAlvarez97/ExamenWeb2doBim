import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Ingrediente, IngredienteService} from "./ingrediente.service";

@Controller('ingrediente')
export class IngredienteController {
    constructor(
        private readonly _ingredienteService:IngredienteService,
    )
    {}

    @Get('registrar')
    registrarIngrediente(
        @Res() response,
        @Session() session
    )
    {
        let admin = undefined;
        let usuario = undefined;

        if(!session.usuario){
            response.redirect("/")
        }

        if (session.usuario.esUsuario){
            usuario = true
        }
        if(session.usuario.esAdministrador && !session.usuario.esUsuario){
            response.redirect("/")
        }

        if (session.usuario.esAdministrador){
            admin = true
        }

        response.render(
            'ingrediente_registro',
            {
                esUsuario:usuario,
                esAdministrador:admin,
                titulo:"Registrar Ingrediente"
            }
        )
    }

    @Post('registrar')
    async registrarIngredientePost(
        @Res() response,
        @Session() session,
        @Body() ingrediente: Ingrediente,
    ){

        if(!session.usuario){
            response.redirect("/")
        }
        if(session.usuario.esAdministrador && !session.usuario.esUsuario){
            response.redirect("/")
        }
        console.log(ingrediente);
        const ingrediente_nueva = await this._ingredienteService.crear(ingrediente);
        response.redirect("/")
    }

    @Get('listar')
    async getRoles(
    ) {
        return await this._ingredienteService.buscar();
    }


}