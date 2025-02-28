import { IsNotEmpty, IsString } from "class-validator";

export class CreateCollectionPointDto {
    @IsNotEmpty()
    @IsString()
    longitude : string;

    @IsNotEmpty()
    @IsString()
    latitude : string;

}
