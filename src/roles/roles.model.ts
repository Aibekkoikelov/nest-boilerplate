import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.model";
import {UserRoles} from "./user-roles.model";
interface RolesCreatorAttrs {
    value: string
    description: string
}

// создание таблицы в базе данных
@Table({tableName:"roles"}) // указываем имя таблицы который должен создастся в бд
export class Roles extends Model<Roles, RolesCreatorAttrs>{ // указываем от чего наследуемся]. в данном случаем от модели женериками который принимает User и интерфейс в котором указали какие данные в начале
    @ApiProperty({example: "1", description: "уникальный идентификатор"}) // необходимое для swagger для описания полей
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})// указывается типб уникальностьб автоинкрементб примари ключ
    id: number
    @ApiProperty({example: "ADMIN", description: "Значение роли  пользователя"})
    @Column({type:DataType.STRING, unique: true, allowNull:false }) // не должен быть пустым
    value:string
    @ApiProperty({example: "Администратор", description: "Описание  роли"})
    @Column({type:DataType.STRING,  allowNull:false })
    description:string
   // создание связи между таблицами многие ко многим
    @BelongsToMany(() => User, () => UserRoles)
    user: User[]

}