import { 
    IsNotEmpty,
    IsNumber,
    IsString, 
    Length,
    Min,

} from "class-validator";

export class CreateProfileDto {
    @IsNumber()
    @IsNotEmpty({ message : 'el user_ID no puede estar vacio' })
    @Min(1, { message : 'El ID no puede ser negativo o cero' })
    user_ID : number

    @IsString()
    @Length(20, 500, { message : 'La biografia es de 20 a 500 caracteres' })
    bio : string
}
