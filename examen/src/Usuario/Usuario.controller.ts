import {BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Usuario, UsuarioService} from "./usuario.service";
import {RolService} from "../rol/rol.service";
import {Like} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioCreateDto} from "./dto/usuario-create.dto";
import {validate, ValidationError} from "class-validator";
import {UsuarioLoginDto} from "./dto/usuario-login.dto";

@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly _usuarioService:UsuarioService,
        private readonly _rolService:RolService,
    ) {}
    @Get('listar')
    async getUsuarios(
        @Res() response,
        @Session() session,
        @Query('busqueda') busqueda:string
    ){
        let admin = undefined;
        let usuario = undefined;

        if(!session.usuario){
            response.redirect("/")
        }
        if(session.usuario.esUsuario){
            usuario = true;
        }
        if(!session.usuario.esAdministrador){
            response.redirect("/")
        }else {
            admin = true;
            let usuarios: UsuarioEntity[];
            if (busqueda) {

                const consulta = {
                    where: [
                        {
                            nombre: Like(`%${busqueda}%`)
                        },
                        {
                            correo: Like(`%${busqueda}%`)
                        }
                    ]
                };
                usuarios = await this._usuarioService.buscar(consulta);
            }else {
                usuarios = await this._usuarioService.buscar();
            }
            response.render('usuario_inicio',{esUsuario:usuario,esAdministrador:admin,titulo:"Usuarios",usuarios:usuarios})
        }
    }

    @Post('borrar/:idUsuario')
    async borrar(
        @Param('idUsuario') idUsuario: string,
        @Res() response
    ) {
        const usuarioEncontrado = await this._usuarioService
            .buscarPorId(+idUsuario);

        await this._usuarioService.borrar(Number(idUsuario));

        const parametrosConsulta = `?accion=borrar&nombre=${usuarioEncontrado.nombre}`;

        response.redirect('/usuario/listar' + parametrosConsulta);
    }

    @Get('actualizar/:idUsuario')
    async verUsuario(
        @Param('idUsuario')idUsuario: string,
        @Res() response,
        @Session() session,
        @Query('mensaje') mensaje:string
    ) {
        let admin = undefined;
        let usuario = undefined;

        if(!session.usuario){
            response.redirect("/")
        }
        if(session.usuario.esUsuario){
            usuario = true;
        }
        if(!session.usuario.esAdministrador){
            response.redirect("/")
        }else {
            admin = true;
            const usuarioEncontrado = await this._usuarioService
                .buscarPorId(+idUsuario);
            response.render(
                'usuario_ver',
                {
                    esUsuario:usuario,
                    esAdministrador:admin,
                    titulo:"Actualizar Usuario",
                    usuario:usuarioEncontrado,
                    mensaje:mensaje
                })
        }
    }

    @Post('eliminar-rol/:idUsuario/:idRol')
    async eliminarRol(
        @Param('idUsuario')idUsuario: string,
        @Param('idRol')idRol: string,
        @Res() response,
        @Session() session,
    ){
        if(!session.usuario){
            response.redirect("/")
        }
        if(!session.usuario.esAdministrador){
            response.redirect("/")
        }
        const usuario_encontrado = await this._usuarioService.buscarPorId(+idUsuario)
        usuario_encontrado.roles= usuario_encontrado.roles.filter( rol => rol.id != +idRol);
        const usuario_actualizado = await this._usuarioService.actualizar(+idUsuario,usuario_encontrado)
        response.redirect("/usuario/actualizar/"+idUsuario)
    }

    @Post('agregar-rol/:idUsuario/')
    async agregarRol(
        @Res() response,
        @Session() session,
        @Body('roles') rol:number,
        @Param('idUsuario') idUsuario:string
    ){
        console.log('este es el rol',rol);
        const nuevo_rol = await this._rolService.buscarPorId(rol);
        console.log("rol:", nuevo_rol);
        const usuario = await this._usuarioService.buscarPorId(+idUsuario);
        const existe_rol = usuario.roles.some(
            (rol)=>{
                        return rol.id == nuevo_rol.id
            }
        );
        if(existe_rol){
            let mensaje = "El usuario ya tiene ese rol";
            console.log("Estoy aqui");
            response.redirect(`/usuario/actualizar/${idUsuario}/?mensaje=${mensaje}`)
        }else {
            usuario.roles.push(nuevo_rol);
            console.log("Estoy aqui nuevo rol");
            const usuario_actualizado = await this._usuarioService.actualizar(+idUsuario,usuario)
            response.redirect("/usuario/actualizar/"+idUsuario)
        }
    }

    @Get('crear-usuario')
    crearUsuario(
        @Res() response
    ) {
        response.render(
            'crear-usuario'
        )
    }

    @Get('login')
    getLogin(
        @Res() response,
        @Query('errores') errores:string
    )
    {
        response.render('login',{titulo:'login',errores:errores})
    }

    @Post('login')
    async loginMetodo(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res() response,
        @Session() sesion
    ) {

        const usuarioValidado = new UsuarioLoginDto();
        usuarioValidado.correo = email;
        usuarioValidado.password = password;
        const errores: ValidationError[] = await validate(usuarioValidado);

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores);
            response.redirect('/usuario/login?errores=Hay errores');
        }else {

            const identificado = await this._usuarioService
                .login(email, password);

            if (identificado) {
                let usuario = await this._usuarioService.buscarPorId(identificado);
                sesion.usuario = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                    esUsuario: usuario.roles.some((rol) => {
                        return rol.nombre == 'usuario';
                    }),
                    esAdministrador: usuario.roles.some((rol) => {
                        return rol.nombre == 'administrador';
                    })
                };
                response.redirect('/')

            } else {
                response.redirect('/usuario/login?errores=Credenciales incorrectas');
            }
        }
    }

    @Get('logout')
    logout(
        @Res() response,
        @Session() sesion,
    ) {
        sesion.usuario = undefined;
        sesion.destroy();
        response.redirect('/');
    }


    @Get('registrarse')
    getRegistrarse(
        @Res() response,
        @Query('errores') mensaje:string
    )
    {
        response.render('registro',{errores:mensaje})
    }

    @Post('registrarse')
    async PostRegistrarse(
        @Res() response,
        @Body() usuario: Usuario,

    )
    {
        const usuarioValidado = new UsuarioCreateDto();

        usuarioValidado.nombre = usuario.nombre;
        usuarioValidado.correo = usuario.correo;
        usuarioValidado.password = usuario.password;
        const errores: ValidationError[] = await validate(usuarioValidado);

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores);
            response.redirect('/usuario/registrarse?errores=Hay errores');
        }else {

            //Buscar el Rol
            const rol = await this._rolService.buscarPorId(1);
            // Registrar usuario
            usuario.roles = [rol];
            const usuario_nuevo = await this._usuarioService.crear(usuario);
            response.redirect("/")
        }
    }


}