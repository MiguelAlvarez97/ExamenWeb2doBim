import {BadRequestException, Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {Usuario} from "../app.controller";
import {UsuarioService} from "./usuario.service";
import {CreateUsuarioDto} from "./dto/create_usuario.dto";
import {UsuarioEntity} from "./usuario.entity";
import {FindManyOptions, Like} from "typeorm";
import {validate, ValidationError} from "class-validator";

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly _usuarioService: UsuarioService) {

    }

    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('busqueda') busqueda: string,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string
    ) {

        let mensaje = undefined;
        let clase = undefined;

        if (accion && nombre) {
            switch (accion) {
                case 'borrar':
                    mensaje = `Registro ${nombre} eliminado.`;
                    clase = 'alert alert-danger';
                    break;

                case 'actualizar':
                    mensaje = `Registro ${nombre} actualizado.`;
                    clase = 'alert alert-info';
                    break;

                case 'crear':
                    mensaje = `Registro ${nombre} creado.`;
                    clase = 'alert alert-success';
                    break;
            }
        }

        let usuarios: UsuarioEntity[];

        if (busqueda) {

            const consulta: FindManyOptions<UsuarioEntity> = {
                where: [
                    {
                        email: Like(`%${busqueda}%`)
                    },
                    {
                        nombre: Like(`%${busqueda}%`)
                    },
                    {
                        apellido: Like(`%${busqueda}%`)
                    }
                ]
            };

            usuarios = await this._usuarioService.buscar(consulta);

        } else {
            usuarios = await this._usuarioService.buscar();
        }


        response.render(
            'inicio',
            {
                usuario: 'Adrian',
                arreglo: usuarios, // AQUI!
                booleano: false,
                mensaje: mensaje,
                clase: clase
            }
        );
    }

    @Post('eliminar/:id')
    async eliminar(
        @Res() response,
        @Param('id') id: string,
    ) {

        const usuario = await this._usuarioService.buscarPorId(+id);

        await this._usuarioService.eliminar(Number(id));

        const parametrosConsulta = `?accion=borrar&nombre=${
            usuario.email
            }`;

        response.redirect('/usuario/inicio' + parametrosConsulta)
    }

    @Get('crear-usuario')
    crearUsuarioRuta(
        @Res() response
    ) {
        response.render(
            'crear-usuario'
        )
    }

    @Post('crear-usuario')
    async crearUsuarioFuncion(
        @Res() response,
        @Body() usuario: Usuario
    ) {

        const objetoValidacionUsuario = new CreateUsuarioDto();

        objetoValidacionUsuario.id = usuario.id;
        objetoValidacionUsuario.nombre = usuario.nombre;
        objetoValidacionUsuario.apellido = usuario.apellido;
        objetoValidacionUsuario.email = usuario.email;
        objetoValidacionUsuario.password = usuario.password;
        objetoValidacionUsuario.fechaNacimiento = usuario.fechaNacimiento;

        const errores: ValidationError[] =
            await validate(objetoValidacionUsuario);

        const hayErrores = errores.length>0;

        if(hayErrores){
            console.error(errores);
            // redirect crear noticia, Y
            // En crear noticia deberian de mostrar mensajes
            // (Como en la pantalla de INICIO)
            throw new BadRequestException({mensaje:'Error de validacion'})
        }else{
            const respuesta = await this._usuarioService.crear(usuario);

            const parametrosConsulta = `?accion=crear&nombre=${usuario.nombre}`;

            response.redirect(
                '/usuario/inicio' + parametrosConsulta
            )
        }

    }

    @Get('actualizar-usuario/:id')
    async actualizarUsuarioVista(
        @Res() response,
        @Param('id') id: string,
    ) {
        // El "+" le transforma en numero a un string
        // numerico
        const usuarioEncontrado = await this._usuarioService
            .buscarPorId(+id);

        response
            .render(
                'crear-usuario',
                {
                    usuario: usuarioEncontrado
                }
            )


    }

    @Post('actualizar-usuario/:id')
    async actualizarUsuarioMetedo(
        @Res() response,
        @Param('id') id: string,
        @Body() usuario: Usuario
    ) {
        usuario.id = +id;
        await this._usuarioService.actualizar(usuario);

        const parametrosConsulta = `?accion=actualizar&nombre=${usuario.email}`;

        response.redirect('/usuario/inicio' + parametrosConsulta);

    }
}
