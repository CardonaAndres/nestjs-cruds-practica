import * as morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CLIENTS, PORT } from './configs/app';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const main = async () => {
  const app = await NestFactory.create(AppModule);
  // Morgan para ver los logs de las solicitudes
  app.use(morgan('dev'));

  // configuración del CORS
  app.enableCors({
    origin: CLIENTS, 
    credentials: true,  
    methods: ['GET', 'POST', 'PUT', 'DELETE'] 
  });

  // Configuración para la validación global de los datos
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true
  }));

  //Configuración de swagger para la documentación
  const config = new DocumentBuilder()
    .setTitle('CRUD example')
    .setDescription('Primer CRUD, practicando la arquitectura y conexión con TypeORM')
    .setVersion('1.0.0.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  await app.listen(PORT);
}

main();
