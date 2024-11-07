import {
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway
} from '@nestjs/websockets';
import { Server } from 'socket.io';



@WebSocketGateway({ namespace: '/notifications' }) // Optional namespace for organization
export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  // @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
  afterInit(server: Server) {
    console.log('WebSocket initialized');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected:', client.id);
  }
  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }
  // Example function to send data to clients
  sendUpdate(data: any) {
    console.log("sender data: ",data)
    this.server.emit('update', data); // Emit 'update' event with data
  }
}
