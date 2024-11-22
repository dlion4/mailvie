/* eslint-disable prettier/prettier */
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class CustomIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions) {
    options = {
      ...options,
      cors: {
        origin: (origin, callback)=>{
          const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:9001",
          ];
          if(allowedOrigins.includes(origin)){
            callback(null, true)
          }else{
            callback(new Error(`origin ${origin} not permitted by Socket CORS!!`))
          }
        }, // Your frontend URL
        methods: ['GET', 'POST'],
        credentials: true,
      },
    };
    return super.createIOServer(port, options);
  }
}
