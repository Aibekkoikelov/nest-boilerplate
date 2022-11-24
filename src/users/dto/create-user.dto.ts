import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";


export class CreateUserDto{
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    @ApiProperty({example: "primer@gmail.com", description: "email пользователя"})
   readonly email:string
    @IsString({message: 'Должно быть строкой'}) // из установленного пакета class-validator указываем что поле должно быть строкой
    @Length(5,15, {message: 'Длина пароля от 5 до 15 символов'}) // из установленного пакета class-validator указываем что поле должно быть строкой и длиной от 5 до 15 символов
    @ApiProperty({example: "12345", description: "Пароль пользователя"}) // добавляем описание поля в swagger
    readonly password:string
}