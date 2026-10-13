import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Configuration du CORS
  app.enableCors({
    origin: '*',  // L'URL de votre application Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Autorise l'envoi des cookies / headers de session si nécessaire
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
