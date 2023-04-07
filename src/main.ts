import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { AppModule } from "./app.module";

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  app.enableCors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Accept",
    credentials: true,
  });

  await app.listen(3001);
}

bootstrap();
