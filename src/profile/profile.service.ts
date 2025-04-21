import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(Profile) private conn : Repository<Profile>){}

  findAll() {
    const usersProfiles = this.conn.find({
      relations: ['user']
    });

    return usersProfiles
  }

  async findOne(user: User) {
    const profile = await this.conn.findOne({
      where : {
        user : user
      }
    });

    return profile
  }

  async create(createProfileDto: CreateProfileDto, user : User) {
    const profile = this.conn.create({
      ...createProfileDto,
      user
    });

    await this.conn.save(profile);
    return profile;
  }

  async update(updateProfileDto: UpdateProfileDto, profile : Profile) {
    await this.conn.save(Object.assign(profile, updateProfileDto));
  }

  async remove(id: number) {
    await this.conn.delete({ profile_ID : id });
  }
}
