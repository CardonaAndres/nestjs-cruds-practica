import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { User } from './users/entities/user.entity';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/entities/profile.entity';

@Module({
  imports: [
    // Conexión a la base de datos
    TypeOrmModule.forRoot({
      type : 'mysql',
      host : 'localhost',
      username : 'root',
      password : '',
      database : 'crud_nest',
      port : 3306,
      entities : [ //Entidades / tablas para crear
        User,
        Profile
      ],
      synchronize : true  
    }),
    UsersModule,
    ProfileModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
