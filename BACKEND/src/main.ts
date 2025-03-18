import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { join } from 'path';



async function bootstrap() {
  const envFile = process.env.DOCKER_ENV ? '.env.docker' : '.env';
  config({ path: join(__dirname, '..', envFile) });

  console.log(`Chargement des variables depuis ${envFile}`);

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
