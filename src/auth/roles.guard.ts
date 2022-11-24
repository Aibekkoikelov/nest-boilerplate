import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";

@Injectable()
export class  RolesGuard implements CanActivate {  // проверка на разрешение доступа к ресурсу по токену
    constructor(private jwtService: JwtService, private reflector: Reflector) {}


    canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try {
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY,[context.getHandler(), context.getClass()]);
            if(!requiredRoles) {
                return true;
            }
            const request = context.switchToHttp().getRequest();
            const bearer = request.headers.authorization.split(' ')[0];
            const token = request.headers.authorization.split(' ')[1];
            if (bearer  !== 'Bearer' || !token) {
                throw new  UnauthorizedException({message:"Пользователь не авторизован"});
            }
            const user = this.jwtService.verify(token);

            request.user = user;

            return user.roles.some(role=> requiredRoles.includes(role.value));


        }catch (e) {
            throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN)
        }
    }

}