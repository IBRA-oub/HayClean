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

    @Prop({ required: true })
    phoneNumber: number;

    @Prop({ required: false })
    image: string

    @Prop({ required: false }) 
    verificationCode?: string;  

    @Prop({ default: false }) 
    isVerified: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User)
