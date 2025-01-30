import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";

@Schema()
export class Administration extends User {}

export const AdministrationSchema  = SchemaFactory.createForClass(Administration)