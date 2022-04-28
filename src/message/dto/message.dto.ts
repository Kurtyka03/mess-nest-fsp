import { IsNotEmpty, IsString } from "class-validator";

export class MessageDto {
    @IsNotEmpty()
    @IsString()
    username :string

    @IsNotEmpty()
    @IsString()
    message: string
}