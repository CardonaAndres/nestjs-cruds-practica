import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put, 
  ParseIntPipe,
  BadRequestException,
  NotFoundException
} from '@nestjs/common';
import { errorHandler } from 'src/utils/error.handler';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary : 'Obtener todos los usuarios' })
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return {
        message : 'Tarea realizada correctamente',
        users
      }
    } catch (err) {
      errorHandler(err)
    }
  }

  @Get(':id')
  @ApiOperation({ summary : 'Obtener un solo usuario' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.findOne(id);
      if(!user) throw new NotFoundException('El usuario no ha sido encontrado')

      return {
        message : 'Tarea exitosa',
        user
      }

    } catch (err) {
      errorHandler(err);
    }
  }

  @Post()
  @ApiOperation({ summary : 'Crear un usuario' })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const userExist = await this.usersService.findOneByEmail(createUserDto.email)
      if(userExist) 
        throw new BadRequestException('El usuario con ese email ya se encuentra registrado')


      const userNew = await this.usersService.create(createUserDto);

      userNew.password = "";

      return {
        message : 'Usuario creado con exito',
        user : userNew
      }

    } catch (err) {
      errorHandler(err);
    }
  }

  @Put(':id')
  @ApiOperation({ summary : 'Actualizar un usuario' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.findOne(id)
      if(!user) throw new NotFoundException('El usuario no existe')

      const userToUpdate = Object.assign(user, updateUserDto)  

      await this.usersService.update(id, userToUpdate)
      
      return {
        message : 'Usuario actualizado correctamente'
      }

    } catch (err) {
      errorHandler(err);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary : 'Eliminar un usuario' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {

      const user = await this.usersService.findOne(id);
      if(!user) throw new NotFoundException('El usuario no existe')

      await this.usersService.remove(id);
      
      return {
        message : 'Usuario eliminado correctamente'
      }

    } catch (err) {
      errorHandler(err);
    }
  }
}
