import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Evento, EventoService} from "./evento.service";
import {PokemonService} from "../pokemon/pokemon.service";
import {PokemonEntity} from "../pokemon/pokemon.entity";
import {EventoEntity} from "./evento.entity";
import {In} from "typeorm";

@Controller('evento')
export class EventoController {
    constructor(
        private readonly _eventoService:EventoService,
        private readonly _pokemonService:PokemonService
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
    async registrarPokemonPost(
        @Res() response,
        @Session() session,
        @Body() evento: Evento,
        @Body('pokemones')pokemones:[],
    ){
        if(!session.usuario){
            response.redirect("/")
        }
        if(session.usuario.esAdministrador && !session.usuario.esUsuario){
            response.redirect("/")
        }

        console.log(evento);
        let parametro ={};
        if(evento.pokemones.length > 1) {
            parametro = {
                where: [
                    {id: In(evento.pokemones)},
                ]
            }
        }else {
            parametro = {
                where: [
                    {id: evento.pokemones},
                ]
            }
        }
        const pokemones_eventos = await this._pokemonService.buscar(parametro);
        evento.pokemones = pokemones_eventos;
        console.log(pokemones_eventos);
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