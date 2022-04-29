import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService,
        ){}

    async getAllMessages(){
        const messages = await this.prisma.message.findMany({
            take: 30,
            select: {
                id: true,
                username: true,
                message: true
            }
        })
        return messages;
    }

    async postAMessage(dto: MessageDto){
        try {
            const mess = await this.prisma.message.create({
                data:{
                    username: dto.username,
                    message: dto.message
                },
                select: {
                    id: true,
                    username: true,
                    createAt: true
                }
            }) 
            return mess;
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('Email Taken');
                }
            }
            throw error;
        }
    }
}
