import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "./roles.model";
@ApiTags('Роли')
@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {
    }
    @ApiOperation({summary: "Создание роли"})
    @ApiResponse({status: 200, type: Roles})
    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        const roles = this.rolesService.createRole(dto)
        return roles
    }
    @ApiOperation({summary: "Получение роли по значению"})
    @ApiResponse({status: 200, type:Roles})
    @Get("/:value")
    getRolesByValue(@Param("value")value: string) {
        const roles = this.rolesService.getRoleByValue(value)
        return roles
    }







}
