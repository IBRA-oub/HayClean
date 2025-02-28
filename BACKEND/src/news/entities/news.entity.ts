import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class News {

    @Prop({required : true})
    image : string;

    @Prop({required : true})
    description : string;

    @Prop({required : true})
    city : string


}

export const NewsSchema = SchemaFactory.createForClass(News)
