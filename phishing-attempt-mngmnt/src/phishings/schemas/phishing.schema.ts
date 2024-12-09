import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class PhishingAttempt {
   @Prop()
   email: string;
   @Prop()
   Status: PhishingAttemptStatus;
   @Prop()
   url: string;
   @Prop()
   createdAt: string;
}
export const PhishingAttemptSchema = SchemaFactory.createForClass(PhishingAttempt);