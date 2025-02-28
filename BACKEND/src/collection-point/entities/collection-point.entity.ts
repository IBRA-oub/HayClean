import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class CollectionPoint {

    @Prop({ required: true })
    longitude: string;

    @Prop({ required: true })
    latitude: string

    @Prop({required:true})
    city:string
}

export const CollectionPointSchema = SchemaFactory.createForClass(CollectionPoint)
