import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/entities/user.entity";

@Schema()
export class Citizen extends User {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

}

export const CitizenSchema = UserSchema.discriminator('Citizen', SchemaFactory.createForClass(Citizen))