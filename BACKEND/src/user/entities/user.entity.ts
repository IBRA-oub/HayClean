import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true, discriminatorKey: 'role' })
export class User extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    city: string;

    @Prop()
    phoneNumber: number;

    @Prop({ required: true, enum: ['Citoyen', 'Municipality', 'Admin'], default: 'Citoyen' })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
