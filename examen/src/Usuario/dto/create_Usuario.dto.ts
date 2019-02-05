import {
    MinLength,
    MaxLength,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsEmail,
    Matches,
    IsAlpha,
    IsDate
} from "class-validator";

export class CreateUsuarioDto {

    @IsNotEmpty()
    @IsString()
    id: number;

    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    apellido: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, {
        message: "La contraseña debe tener MINIMO de 8 caracteres"
    })
    @MaxLength(16, { // here, $constraint1 will be replaced with "50", and $value with actual supplied value
        message: "La contraseña debe tener MAXIMO de 16 caracteres"
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/,{
        message: "sadasdasdasd"
    })
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsDate()
    fechaNacimiento: string;

}