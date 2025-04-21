import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userDB : Repository<User>){}

  async findAll() {
    const users = await this.userDB.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.userDB.findOneBy({ user_ID : id })
    return user;
  }

  async findOneByEmail(email : string) {
    const user = this.userDB.findOneBy({ email });
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userDB.create(createUserDto);
    await this.userDB.save(newUser)
    return newUser
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userDB.update({ user_ID : id }, updateUserDto)
  }

  async remove(id: number) {
    await this.userDB.delete({ user_ID : id })
  }
}
