import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "../exceptions/validation.exception";
@Injectable()
export  class ValidationPipe implements PipeTransform<any> { // необходим Pipe для трансформации данных и валидация данных
   async transform(value: any, metadata: ArgumentMetadata): Promise <any> {
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);
        if(errors.length ){
            let message = errors.map(error => {
                return `${error.property} - ${Object.values(error.constraints).join(', ')}`;
            })
            throw new ValidationException(message);

        }
  return value;
    }}