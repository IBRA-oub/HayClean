import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

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


    @IsEnum(['Citoyen', 'Municipality', 'Admin'])
    role: 'Citoyen' | 'Municipality' | 'Admin';

}
