import {Body, Controller, Get, Param, Post, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./user.model";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {AddRoleDto} from "./dto/addRole.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ValidationPipe} from "../pipe/validation.pipe";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService){}

   @ApiOperation({summary: "Создание пользователя"})
   @ApiResponse({status:200, type: User})
   @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.userService.createUser(userDto)
    }
  @ApiOperation({summary: "Получение всех пользователей"})
  @ApiResponse({status:200, type: [User]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)// проверка на авторизацию
    @Get()
    getAllUser(){
      return this.userService.getAllUsers()
    }

    @ApiOperation({summary: "Выдать роль"})
    @ApiResponse({status:200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/role")
    addRoles(@Body()dto: AddRoleDto){
      return this.userService.addRole(dto)
    }

    @ApiOperation({summary: "Банить пользователя"})
    @ApiResponse({status:200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard) // проверка на авторизацию
    @Post("/ban")
    ban(@Body()dto: BanUserDto){
      return this.userService.ban(dto)
    }


    @ApiOperation({summary: "Получение пользователя по почте"})
    @Get('/email')
    GetUserByEmail(@Param("email")email: string){
        return this.userService.getUserByEmail(email)
    }

}
