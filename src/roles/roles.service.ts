import { Injectable } from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {Roles} from "./roles.model";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class RolesService {
    constructor(@InjectModel(Roles) private roleRepository: typeof Roles){}

    async createRole(dto: CreateRoleDto) {
       const roles = this.roleRepository.create(dto)
        return roles
    }

    async getRoleByValue(value: string) {
        const roles = await this.roleRepository.findOne({where: {value}})
        return roles
    }
}
