import { Transform } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
    // @Transform(({ value }) => 
    //     Array.isArray(value) ? value.filter(Boolean) : (typeof value === "string" ? value.split(",").filter(Boolean) : [])
    // )
    type: string[];
    
    @IsArray()
    @IsString({ each: true })
    sad?: string[];
    
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    // @Transform(({ value }) => 
    //     Array.isArray(value) ? value.filter(Boolean) : (typeof value === "string" ? value.split(",").filter(Boolean) : [])
    // )
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
