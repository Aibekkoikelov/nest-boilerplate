import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {User} from "./user.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {Roles} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {Post} from "../posts/posts.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[SequelizeModule.forFeature([User,Roles, UserRoles,Post]), RolesModule,forwardRef(()=>AuthModule) ],
    exports:[UsersService]
})
export class UsersModule {}
