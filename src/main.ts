import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function start (){

    const PORT = process.env.PORT || 5000;

    const app = await  NestFactory.create(AppModule)  // создаем экземпляр приложения и указываем главный модуль в которов настраиваем весь проект

    const config = new DocumentBuilder()  // позволяет задавать для обьекта параметры
        .setTitle("Урок по продвинутому бекэнду")
        .setDescription("Документация REST API")
        .setVersion("1.0.0")
        .addTag("Aibek Koikelov")
        .build()
    const document = SwaggerModule.createDocument(app,config) //  далее создаем документ свагера и в параметрах передаем наше приложение и конфиг переменную
    SwaggerModule.setup("/api/docs", app, document) // настраиваем передавая путь по которому могут зайти в докуентацию наш проект и документ

    await  app.listen(PORT, () => {
        console.log(`Server running on porter ${PORT}`)
    })

}


      start()