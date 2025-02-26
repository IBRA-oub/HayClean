import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    city: string;

    @Prop()
    email: string
}

export const UserSchema = SchemaFactory.createForClass(User)

@Schema({ timestamps: true })
export class Report {

    @Prop({ required: false })
    image: string;

    @Prop({ required: true })
    size: string;

    @Prop({ required: true })
    type: string[];

    @Prop({ required: false  })
    sad: string[];

    @Prop({ required: false, default: false })
    inCave: boolean;

    @Prop({ required: false, default: false })
    water: boolean;

    @Prop({ required: false, default: false })
    notGenCleanup: boolean;

    @Prop({ required: true })
    longitude: string;

    @Prop({ required: true })
    latitude: string;

    @Prop({ required: false, default: 'pending' })
    status: string;

    @Prop({ required: false })
    moreInfo: string;

    @Prop({type : UserSchema , required : true})
    user : User;


}

export const ReportSchema = SchemaFactory.createForClass(Report)
