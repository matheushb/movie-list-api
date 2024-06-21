import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import appConfig from './common/config/app.config';
import swaggerConfig from './common/config/swagger.config';

async function bootstrap() {
  /*
  #TODO: Recomendacao com base nas preferencias do usuário (talvez um "escolha para mim")
    #TODO: TEST
    #EXEMPLOS DE LISTA : (ex: "Melhores Filmes de 2023", "Clássicos do Cinema", etc.).
  */

  const app = await NestFactory.create(AppModule);

  appConfig(app);
  swaggerConfig(app);

  await app.listen(3000);
}
bootstrap();
