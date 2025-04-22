# 🚀 API REST con NestJS - CRUD de Usuarios y Perfiles (Proyecto de Práctica)

Este es un **proyecto de práctica** desarrollado con [**NestJS**](https://nestjs.com/), donde se ha implementado un **CRUD de usuarios** y su respectivo **perfil**, utilizando una relación **OneToOne**, así como una relación **ManyToMany** en la base de datos mediante **TypeORM**. Este proyecto tiene como objetivo practicar la implementación de APIs RESTful, con una estructura organizada y bien definida.

Toda la **documentación interactiva de la API** fue generada con **Swagger**, lo que permite explorar y probar los endpoints de forma sencilla.

---

## 🛠️ Funcionalidades Principales

- ✅ **Gestión de usuarios**: Crear, obtener, actualizar y eliminar usuarios.
- ✅ **Gestión de perfiles**: Cada usuario tiene un perfil relacionado uno a uno.
- ✅ **Gestión de posts**: Los usuarios pueden tener múltiples publicaciones asociadas (relación OneToMany).
- ✅ **Relación Muchos a Muchos** ya implementada.
- ✅ **Conexión a base de datos relacional** con **TypeORM**.
- ✅ **Documentación automática con Swagger** para probar y explorar la API.
- ✅ **Proyecto de práctica**: Implementación de buenas prácticas en el desarrollo de aplicaciones backend.

---

## 📚 Tecnologías Utilizadas

- **NestJS** - Framework para Node.js basado en TypeScript.
- **TypeORM** - ORM para trabajar con bases de datos relacionales.
- **Swagger (OpenAPI)** - Generación de documentación interactiva.
- **MySQL**  
- **Node.js & TypeScript**

---

## 📖 Documentación Swagger

La documentación completa de la API está generada con Swagger y es accesible de manera interactiva:

```
http://localhost:3000/api
```

Desde esta interfaz, puedes explorar todos los endpoints disponibles y probar la funcionalidad de la API.

---

## 🚀 Cómo Ejecutar el Proyecto

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/CardonaAndres/nestjs-cruds-practica.git
   cd nestjs-cruds-practica
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura la base de datos**:
   Las variables de configuración, como la conexión a la base de datos, se encuentran en el archivo `src/configs/app.ts`.

   Asegúrate de configurar correctamente los detalles de tu base de datos.

4. **Ejecuta el proyecto en modo desarrollo**:
   ```bash
   npm run dev
   ```

---

## 🧠 Aprendizajes del Proyecto

- Estructuración y desarrollo de APIs RESTful utilizando **NestJS**.
- Uso de **TypeORM** para manejar relaciones entre entidades, incluyendo **OneToOne** y **ManyToMany**.
- Implementación de una **documentación interactiva con Swagger**.
- Conexión y gestión de bases de datos relacionales sin necesidad de un ORM complejo.
- Buenas prácticas en el desarrollo de aplicaciones backend.

---

## 🧭 Próximo Paso: ¡Mi Primer Proyecto Real!

Con este proyecto de práctica ya finalizado, **ahora comenzaré mi primer proyecto real** 🎉. Aplicaré todo lo aprendido aquí, profundizando aún más en la arquitectura de software, seguridad, autenticación, autorización y más relaciones entre entidades. ¡Vamos por más! 💪