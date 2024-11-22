/* eslint-disable prettier/prettier */
import { Controller, Post, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
    constructor(private authenticationService: AuthenticationService){}
    
    @Post('authenticate')
    async login(@Req() request: Request) {
        this.authenticationService.login(request.body)
        return { message: 'Logged in successfully from webhook' };
    }
}
