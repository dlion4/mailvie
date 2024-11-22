/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
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
  handleMessage(_client: any, _payload: any): string {
    return 'Hello world!';
  }
  afterInit(_server: Server) {
    console.log('WebSocket initialized');
  }
  handleConnection(client: any, ..._args: any[]) {
    console.log('Client connected:', client.id);
  }
  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }
  // Example function to send data to clients
  sendUpdate(data: any) {
    this.server.emit('update', data); // Emit 'update' event with data
  }
}
