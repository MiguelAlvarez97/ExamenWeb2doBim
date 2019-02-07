import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Evento, EventoService} from "./evento.service";
import {IngredienteService} from "../ingrediente/ingrediente.service";
import {IngredienteEntity} from "../ingrediente/ingrediente.entity";
import {EventoEntity} from "./evento.entity";
import {In} from "typeorm";

@Controller('evento')
export class EventoController {
    constructor(
        private readonly _eventoService:EventoService,
        private readonly _ingredienteService:IngredienteService
    )
    {}

    @Get('registrar')
    getEventos(
        @Res() response,
        @Session() session,
    ){
        let usuario = undefined
        let admin = undefined
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
            'evento_registro',
            {
                esUsuario:usuario,
                esAdministrador:admin,
                titulo:"Registrar Evento"
            }
        )
    }

    @Post('registrar')
    async registrarIngredientePost(
        @Res() response,
        @Session() session,
        @Body() evento: Evento,
        @Body('ingredientes')ingredientes:[],
    ){
        if(!session.usuario){
            response.redirect("/")
        }
        if(session.usuario.esAdministrador && !session.usuario.esUsuario){
            response.redirect("/")
        }

        console.log(evento);
        let parametro ={};
        if(evento.ingredientes.length > 1) {
            parametro = {
                where: [
                    {id: In(evento.ingredientes)},
                ]
            }
        }else {
            parametro = {
                where: [
                    {id: evento.ingredientes},
                ]
            }
        }
        const ingredientes_eventos = await this._ingredienteService.buscar(parametro);
        evento.ingredientes = ingredientes_eventos;
        console.log(ingredientes_eventos);
        const nuevo = await this._eventoService.crear(evento);
        response.redirect("/")
    }

    @Get('ver/:idEvento')
    async verEvento(
        @Param('idEvento')idEvento: string,
        @Res() response,
        @Session() session,
    ) {
        let admin =undefined;
        let usuario = undefined;
        if(session.usuario){

            if (session.usuario.esUsuario){
                usuario = true
            }
            if(session.usuario.esAdministrador){
                admin = true
            }
        }
        const eventoEncontrado = await this._eventoService
                .buscarPorId(+idEvento);
            response.render(
                'evento_ver',
                {
                    esUsuario:usuario,
                    esAdministrador:admin,
                    titulo:"Ver evento",
                    evento:eventoEncontrado,
                })
        }

}