import { ArrayNotEmpty, IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateReportDto {
    @IsString()
    image?: string;
  
    @IsString()
    size: string;
  
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    type: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    sad?: string[];
  
    @IsBoolean()
    @IsOptional()
    inCave?: boolean;
  
    @IsBoolean()
    @IsOptional()
    water?: boolean;
  
    @IsBoolean()
    notGenCleanup: boolean;
  
    @IsString()
    longitude: string;
  
    @IsString()
    latitude: string;
  
    @IsString()
    @IsOptional()
    status?: string;
  
    @IsString()
    @IsOptional()
    moreInfo?: string;

}
