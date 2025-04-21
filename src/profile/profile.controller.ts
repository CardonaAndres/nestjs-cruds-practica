import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { errorHandler } from 'src/utils/error.handler';
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseIntPipe, 
  NotFoundException
} from '@nestjs/common';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userService: UsersService
  ) {}

  @Get()
  @ApiOperation({ summary : 'Todos los perfiles' })
  async findAll() {
    try {
      const usersProfiles = await this.profileService.findAll();
      return {
        message : usersProfiles.length > 0 ? 'Tarea exitosa' : 'No hay perfiles de usuarios',
        usersProfiles
      }
    } catch (err) {
      errorHandler(err);
    }
  }

  @Get(':id')
  @ApiOperation({ summary : 'Perfil por ID de usuario' })
   async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.findOne(id);
      if(!user) throw new NotFoundException('El usuario no existe');

      const profile = await this.profileService.findOne(user);
      if(!profile) throw new NotFoundException('El usuario no tiene perfil')

      return {
        message : 'Tarea exitosa',
        profile
      }

    } catch (err) {
      errorHandler(err);
    }
  }

  @Post()
  @ApiOperation({ summary : 'Crear perfil' })
  async create(@Body() createProfileDto: CreateProfileDto) {
    try {
      const user = await this.userService.findOne(createProfileDto.user_ID);
      if(!user) throw new NotFoundException('El usuario con el ID dado no existe')

      const profile = await this.profileService.create(createProfileDto, user);

      return {
        message : 'Perfil creado correctamente',
        profile
      }

    } catch (err) {
      errorHandler(err);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary : 'Actualizar perfil' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProfileDto: UpdateProfileDto) {
    try {
        const user = await this.userService.findOne(id);
        if(!user) throw new NotFoundException('El usuario no existe');

        const profile = await this.profileService.findOne(user);
        if(!profile) throw new NotFoundException('El usuario no tiene perfil, crea uno');

        await this.profileService.update(updateProfileDto, profile)

        return { 
          message : 'Perfil actualizado correctamente'
        }

    } catch (err) {
      errorHandler(err);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary : 'Eliminar perfil' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.findOne(id);
      if(!user) throw new NotFoundException('El usuario no existe');

      const profile = await this.profileService.findOne(user);
      if(!profile) throw new NotFoundException('El usuario no cuenta con un perfil para eliminar')

      await this.profileService.remove(profile.profile_ID)  

      return {
        message : 'Perfil eliminado correctamente' 
      }

    } catch (err) {
      errorHandler(err);
    }
  }
}
