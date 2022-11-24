import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Roles} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Post} from "../posts/posts.model";
interface UserCreatorAttrs {
    email: string
    password: string
}
// создание таблицы в базе данных и полей в ней к ней указываем имя таблицы который должен создастся в бд
@Table({tableName:"users"}) // указываем имя таблицы который должен создастся в бд
export class User extends Model<User, UserCreatorAttrs>{ // указываем от чего наследуемся]. в данном случаем от модели женериками который принимает User и интерфейс в котором указали какие данные в начале
    @ApiProperty({example: "1", description: "уникальный идентификатор"}) // необходимое для swagger для описания полей
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})// указывается типб уникальностьб автоинкрементб примари ключ
    id: number
    @ApiProperty({example: "primer@gmail.com", description: "email пользователя"})
    @Column({type:DataType.STRING, unique: true, allowNull:false }) // не должен быть пустым
    email:string
    @ApiProperty({example: "12345", description: "Пароль пользователя"})
    @Column({type:DataType.STRING,  allowNull:false })
    password:string
    @ApiProperty({example: true, description: "Забанен пользователь или нет"})
    @Column({type:DataType.BOOLEAN, defaultValue:false }) // дефолтное значение
    banned:boolean
    @ApiProperty({example: "текст", description: "комментарии к бану пользователя"})
    @Column({type:DataType.STRING, allowNull:true })
    banReason: string


    @BelongsToMany(() => Roles, () => UserRoles)
    roles: Roles[]

    @HasMany(()=> Post)
    posts: Post[]
}