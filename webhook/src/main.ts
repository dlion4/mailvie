import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
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
  // Enable CORS for all routes
//  app.enableCors({
//   origin: (origin, callback) => {
//     const allowedOrigins = [
//       'http://localhost:5173',
//       'http://127.0.0.1:9001',
//     ];
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true); // Allow the origin
//     } else {
//       callback(new Error(`Origin ${origin} Not allowed by Global CORS!!`)); // Reject the origin
//     }
//   },
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// });
  app.useWebSocketAdapter(new CustomIoAdapter(app))
  await app.listen({port: 3000,host: "localhost"});
}
bootstrap();
