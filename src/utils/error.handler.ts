import { 
    BadRequestException,
    InternalServerErrorException, 
    NotFoundException 
} from "@nestjs/common"

export const errorHandler = (err : unknown) : never => {
    if (err instanceof NotFoundException) throw err
    if (err instanceof BadRequestException) throw err

    throw new InternalServerErrorException(err);
}