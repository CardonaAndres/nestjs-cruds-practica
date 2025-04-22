import { ApiProperty } from '@nestjs/swagger'
import { 
    IsEmail, 
    IsNotEmpty,
    IsString, 
    Length,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator'

export class CreateUserDto  {
    @ApiProperty({ description : 'Nombre del usuario' })
    @IsString({ message : 'El nombre debe ser un string' })
    @IsNotEmpty({ message : 'El nombre no puede estar vacio' })
    @Length(3, 80, { message : 'El nombre debe estar entre 3 a 80 caracteres' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
        message: 'El nombre solo puede contener letras y espacios.' 
    })
    name : string

    @ApiProperty({ description : 'Correo del usuario' })
    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
    @MaxLength(100, { message: 'El correo electrónico no puede tener más de 100 caracteres.' })
    email : string

    @ApiProperty({ description : 'Contraseña del usuario' })
    @IsString({ message: 'La contraseña debe ser un texto.' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
    @MinLength(8, { message : 'La contraseña es minimo de 8 caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número.',
    })
    password : string
}
