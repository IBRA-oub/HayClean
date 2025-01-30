import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";


@Schema()
export class Municipality extends User {
    @Prop({ required: true })
    name: string;
}

export const MunicipalitySchema  = SchemaFactory.createForClass(Municipality)