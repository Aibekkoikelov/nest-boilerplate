import {SetMetadata} from "@nestjs/common";


export const ROLES_KEY = 'roles';

export const Roles=(...roles: string[])=> SetMetadata(ROLES_KEY, roles);  // это декоратор, который применяется к методу, который нужно проверить на права доступа