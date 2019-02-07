import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Pokemon, PokemonService} from "./pokemon.service";

@Controller('pokemon')
export class PokemonController {
    constructor(
        private readonly _pokemonService:PokemonService,
    )
    {}

    @Get('registrar')
    registrarPokemon(
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
            'pokemon_registro',
            {
                esUsuario:usuario,
                esAdministrador:admin,
                titulo:"Registrar Pokemon"
            }
        )
    }

    @Post('registrar')
    async registrarPokemonPost(
        @Res() response,
        @Session() session,
        @Body() pokemon: Pokemon,
    ){

        if(!session.usuario){
            response.redirect("/")
        }
        if(session.usuario.esAdministrador && !session.usuario.esUsuario){
            response.redirect("/")
        }
        console.log(pokemon);
        const pokemon_nueva = await this._pokemonService.crear(pokemon);
        response.redirect("/")
    }

    @Get('listar')
    async getRoles(
    ) {
        return await this._pokemonService.buscar();
    }


}