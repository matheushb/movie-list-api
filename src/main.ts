import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import appConfig from './common/config/app.config';
import swaggerConfig from './common/config/swagger.config';

async function bootstrap() {
  /*
    #TODO: CRUD ( USER, LIST, MOVIE, USERLIST, MOVIELIST)
    #TODO: Validation (DTO)
    #TODO: Auth (JWT)
    #TODO Authorization (Roles)
    #TODO: Error Handling
    #TODO: Movie & List Rating System (Nova Média = ( Media Anterior * Quantidade Anterior) + Nova Nota) 
                                                    / (Quantidade Anterior + 1)
    #TODO: Recomendacao com base nas preferencias do usuário (talvez um "escolha para mim")
    #TODO: Logger
    #TODO: TEST
    #EXPORTAR JSON NO POSTMAN ou fazer swagger abrangente
    #EXEMPLOS DE LISTA : (ex: "Melhores Filmes de 2023", "Clássicos do Cinema", etc.).
  */

  const app = await NestFactory.create(AppModule);

  appConfig(app);
  swaggerConfig(app);

  await app.listen(3000);
}
bootstrap();
