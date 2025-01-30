import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateMunicipalityDto extends CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name : string;

}
