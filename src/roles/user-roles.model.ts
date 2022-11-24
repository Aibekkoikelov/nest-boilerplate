import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Roles} from "./roles.model";
import {User} from "../users/user.model";


@Table({tableName:"user_roles", createdAt: false, updatedAt:false}) // указываем имя таблицы который должен создастся в бд
export class UserRoles extends Model<UserRoles>{ // указываем от чего наследуемся]. в данном случаем от модели женериками который принимает User и интерфейс в котором указали какие данные в начале

    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})// указывается типб уникальностьб автоинкрементб примари ключ
    id: number
    @ForeignKey(() => Roles)
    @Column({type:DataType.INTEGER })
    roleId:number
    @ForeignKey(() => User)
    @Column({type:DataType.INTEGER })
    userId:number
}