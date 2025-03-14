import { ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateReportDto {
    @IsString()
    @IsNotEmpty()
    image: string;
  
    @IsString()
    @IsNotEmpty()
    size: string;
  
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    type: string[];
    
    @IsArray()
    @IsString({ each: true })
    sad?: string[];
    
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    accessibility: string[];
    
  
    @IsString()
    @IsNotEmpty()
    longitude: string;
  
    @IsString()
    @IsNotEmpty()
    latitude: string;
  
    @IsString()
    @IsOptional()
    status?: string;
  
    @IsString()
    @IsOptional()
    moreInfo?: string;

}
