import { Body, Controller, Get, Post } from '@nestjs/common';
import { Request } from 'express';
import { MessageDto } from './dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(private messageservice: MessageService){}

    @Get('all')
    getAllMessages(){
        return this.messageservice.getAllMessages();
    }

    @Post('add')
    postMessage(@Body() dto: MessageDto){
        return this.messageservice.postAMessage(dto);
    }
}