// usuario-crate.dto.ts

import {
    IsAlpha,
    IsDate,
    IsDateString,
    IsEmail,
    IsEmpty,
    IsNotEmpty,
    IsString,
    Length,
    Matches,
    MinDate
} from "class-validator";

export class UsuarioCreateDto {

    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z\s]*$/,{message:"Nombre no valido"})
    @Length(3,20)
    nombre:string;

    @IsNotEmpty()
    @IsString()
    @Length(15,30)
    @IsEmail()
    correo:string;

    @IsNotEmpty()
    @IsString()
    @Matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/ ,
            {message: "Contrasenia Invalida"
        })

    password:string;

   /* @IsNotEmpty()
    @MinDate( new Date() , {message: "La Fecha no Puede superar la fecha actual"} )
    fecha_nacimiento:string;
*/
}