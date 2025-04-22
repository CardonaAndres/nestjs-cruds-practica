import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator"

export class CreatePostDto {
    @ApiProperty({ description : 'Titulo del post' })
    @IsString()
    @IsNotEmpty()
    @Length(5, 100, { message : 'El titulo es de 5 a 100 caracteres' })
    title : string

    @ApiProperty({ description : 'Contenido del post' })
    @IsString()
    @IsNotEmpty()
    @Length(20, 500, { message : 'El contenido es de 20 a 500 caracteres' })
    content : string

    @ApiProperty({ description : 'El ID del usuario' })
    @IsNumber()
    @IsNotEmpty()
    @Min(1, { message : 'El ID del usuario debe ser mayor a 0' })
    user_ID : number
}
