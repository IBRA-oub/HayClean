import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsNumber()
    @IsNotEmpty()
    phoneNumber: number

    @IsString()
    @IsOptional()
    image: string 

}
