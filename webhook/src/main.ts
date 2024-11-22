/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { CustomIoAdapter } from './cors';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    { abortOnError: false }
  );
  app.useWebSocketAdapter(new CustomIoAdapter(app))
  await app.listen({ port: 3000, host: "localhost" });
}
bootstrap();
