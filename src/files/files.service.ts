import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import path from 'path'; // библиотека для работы с путями
import * as fs from 'fs'; // библиотека файловой системы
import * as uuid from 'uuid';  // для уникальности с помошью библиотеки uuid
@Injectable()
export class FilesService {

    async createFile(file): Promise<string> {
      try {
      const fileName = uuid.v4() + "jpg"; // генерируем уникальное имя файла
      const filePath = path.join(__dirname, "..", "static") // создание пути к папке
          if(!fs.existsSync(filePath)){ // проверяем если нет такой папки то создаем его
              fs.mkdirSync(filePath, {recursive: true}); // создаем папку и делаем его рекурсивно
          }
          const filePathName = path.join(filePath, fileName); // путь к файлу
            fs.writeFileSync(filePathName, file.buffer); // записываем в файл
          return fileName;
      }catch (e) {
          throw new HttpException("произошла ошибка при  записи файла", HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }



}


