import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Participant {
 
  @Prop({ required: true })
  firstName: string; 

  @Prop({ required: true })
  lastName: string; 

  @Prop({ required: true })
  email: string; 

  @Prop({ required: true })
  city: string; 

  @Prop({ required: true, enum: ["pending", "accepted", "rejected"], default: "pending" })
  status: string; 
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);

@Schema({timestamps : true})
export class Event {

@Prop({required : false})
image : string

@Prop({required : true})
description : string

@Prop({required : true})
date : Date

@Prop({required : true})
city : string

@Prop({required : true})
location : string

@Prop({required : true})
time : string

@Prop({ type: [ParticipantSchema], default: [] })
  participants: Participant[]

}
export const EventSchema = SchemaFactory.createForClass(Event)
