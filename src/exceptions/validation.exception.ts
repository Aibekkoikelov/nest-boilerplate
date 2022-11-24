import {HttpException, HttpStatus} from "@nestjs/common";


export class ValidationException extends HttpException {  // для получения ошибок валидации используем метод
    messages;
  constructor(response){
      super(response, HttpStatus.BAD_REQUEST);
        this.messages = response;

  }

}