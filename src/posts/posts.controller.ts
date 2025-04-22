import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from 'src/users/users.service';
import { errorHandler } from 'src/utils/error.handler';
import { ApiOperation } from '@nestjs/swagger';
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  NotFoundException, 
  ParseIntPipe
} from '@nestjs/common';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly userService: UsersService
  ) {}

  @Get()
  @ApiOperation({ summary : 'Obtener todos los posts' })
  async findAll() {
    try {
      const posts = await this.postsService.findAll();

      posts.map(post => post.user.password = "")

      return {
        message : 'Todos los posts hasta el momento',
        posts
      }

    } catch (err) {
      errorHandler(err);
    }
  }

  @Get(':id')
  @ApiOperation({ summary : 'Obtener un solo post' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const post = await this.postsService.findOne(id);
      if(!post) throw new NotFoundException('El Post con el ID dado no existe')

      return {
        message : 'Tarea exitosa',
        post
      }

    } catch (err) {
      errorHandler(err);
    }
  }

  @Post()
  @ApiOperation({ summary : 'Crear un post' })
  async create(@Body() createPostDto: CreatePostDto) {
    try {
      const user = await this.userService.findOne(createPostDto.user_ID);
      if(!user) throw new NotFoundException('El usuario con el ID dado no existe')

      await this.postsService.create(createPostDto, user)  

      return {
         message : 'El post fue creado correctamente',

      }

    } catch (err) {
      errorHandler(err);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary : 'Actualizar un post' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    try {
      const post = await this.postsService.findOne(id);
      if(!post) throw new NotFoundException('El post no existe');

      await this.postsService.update(updatePostDto, post);

      return {
        message : 'El post fue actualizado con exito'
      }

    } catch (err) {
      errorHandler(err);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary : 'Rliminar un post' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const post = await this.postsService.findOne(id);
      if(!post) throw new NotFoundException('El post no existe')  

      await this.postsService.remove(id);
       
      return {
        message : 'El post fue eliminado correctamente'
      }

    } catch (err) {
      errorHandler(err);
    }
  }
}
