import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Rol } from '../app.controller';
import {RolEntity} from './Rol.entity';
import {RolService} from './Rol.service';
import {FindManyOptions, Like} from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import {CreateRolDto} from './dto/create-rol.dto';

@Controller('rol')
export class rolController {
    constructor(
        private readonly _rolService: RolService
    ){}

    @Get('roles')
    async roles(
        @Res() response,
        @Query('busqueda') busqueda: string,
        @Query('accion') accion: string,
        @Query('rol') rol: string,
    ) {
        let mensaje = undefined;
        let clase = undefined;

        if (accion && rol) {
            switch (accion) {
                case 'borrar':
                    mensaje = `Registro ${rol} eliminado`;
                    clase = 'alert alert-danger';
                    break;
                case 'actualizar':
                    mensaje = `Registro ${rol} actualizado`;
                    clase = 'alert alert-info';
                    break;
                case 'crear':
                    mensaje = `Registro ${rol} creado`;
                    clase = 'alert alert-success';
                    break;
            }
        }

        let roles: RolEntity[];
        if (busqueda) {
            const consulta: FindManyOptions<RolEntity> = {
                where: [
                    {
                        nombreE: Like(`%${busqueda}`)
                    }
                ]
            };
            roles = await this._rolService.buscarRol(consulta);
        } else {
            roles = await this._rolService.buscarRol();
        }
        response.render(
            'roles',
            {
                arregloRoless: roles,
                booleano: false,
                mensaje: mensaje,
                clase: clase
            }
        );
    }

    @Post('eliminar/:rolId')
    async eliminar(
        @Res() response,
        @Param('rolId') rolId: string,
    ) {
        const rol = await this._rolService.buscarPorIdRol(+rolId);
        await this._rolService.eliminarRol(Number(rolId));
        const parametrosConsulta = `?accion=borrar%rol=${
            rol.tipoRol
            }`;
        response.redirect('/rol/roles' + parametrosConsulta)
    }

    @Get('crear-rol')
    crearRolRuta(
        @Res() response
    ) {
        response.render(
            'crear-rol'
        )
    }

    @Post('crear-rol')
    async crearRolFuncion(
        @Res() response,
        @Body() rol: Rol
    ) {
        const objetoValidacion = new CreateRolDto()

        const errores: ValidationError[] = await validate(
            objetoValidacion);

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores);
            throw new BadRequestException({mensaje: 'Error de validacion'})
        } else {
            const respuesta = await this._rolService.crearRol(rol);
            const parametrosConsulta = `?accion=crear&rol=${rol.tipo}`;

            response.redirect(
                '/rol/roles' + parametrosConsulta
            );
        }
    }

    @Get('actualizar-rol/:rolId')
    async actualizarRolVista(
        @Res() response,
        @Param('rolId') rolId: string,
    ) {
        const rolEncontrado = await this._rolService
            .buscarPorIdRol(+rolId);

        response.render(
            'crear-rol',
            {
                rol: rolEncontrado
            }
        )
    }

    @Post('actualizar-rol/:rolId')
    async actualizarRolMetodo(
        @Res() response,
        @Param('rolId') rolId: string,
        @Body() rol: Rol
    ) {
        rol.rolId = +rolId;
        await this._rolService.actualizarRol(rol);

        const parametrosConsulta = `?accion=actualizar&entrenador=${rol.tipo}`

        response.redirect(
            'rol/roles' + parametrosConsulta
        );
    }
}