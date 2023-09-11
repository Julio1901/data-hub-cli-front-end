import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InitialMenu } from './menus/initial-menu';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3006);

  const initialMenu = new InitialMenu()
  await initialMenu.main()

}
bootstrap();
