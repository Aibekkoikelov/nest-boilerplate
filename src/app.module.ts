import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/user.model";
import {RolesModule} from "./roles/roles.module";
import {Roles} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import {Post} from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";


@Module({
    controllers:[],
    providers:[],
    imports: [
        ConfigModule.forRoot({
            envFilePath:`.${process.env.NODE_ENV}.env` // создаем чтобы мы могли видеть .env файлы установив пакет cross-env
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
    SequelizeModule.forRoot({  // подключаем базу данных указываем настройки порт пароль логин имя базы данных хост и так далее а в массив моделей указываем модели со схемами
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT ,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        models: [User, Roles, UserRoles, Post],// указываем файлы с моделями которые будут созданы в таблице бд
        autoLoadModels: true
    }),
UsersModule, RolesModule, AuthModule, PostsModule, FilesModule] // указываем также дополнительные модули так как данный файл является главной
})
export class AppModule {

}
