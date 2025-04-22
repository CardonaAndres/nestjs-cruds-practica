import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private conn : Repository<Post>){}

  async findAll() {
    const posts = await this.conn.find({
      relations : ['user']
    });
    
    return posts;
  }

  async findOne(id: number) {
    const post = await this.conn.findOne({
      where : {
        post_ID : id
      }
    });

    return post
  }

  async create(createPostDto: CreatePostDto, user : User) {
    await this.conn.save({
      ...createPostDto,
      user
    })
  }

  async update(updatePostDto: UpdatePostDto, post : Post) {
    await this.conn.save(Object.assign(post, updatePostDto));
  }

  async remove(id: number) {
    await this.conn.delete({ post_ID : id })
  }
}
