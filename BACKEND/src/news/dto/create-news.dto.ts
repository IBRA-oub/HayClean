import { IsNotEmpty, IsString } from "class-validator";

export class CreateNewsDto {
    @IsString()
    @IsNotEmpty()
    image : string;

    @IsNotEmpty()
    @IsString()
    description : string;
}
