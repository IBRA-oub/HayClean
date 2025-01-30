import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateCitizenDto extends CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName : string;

    @IsString()
    @IsNotEmpty()
    lastName : string;

}
