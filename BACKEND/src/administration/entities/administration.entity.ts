import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/entities/user.entity";

@Schema()
export class Administration extends User {}

export const AdministrationSchema  = UserSchema.discriminator('Administration',SchemaFactory.createForClass(Administration))