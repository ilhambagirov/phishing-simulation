import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop()
    username: string

    @Prop()
    passwordSalt: string

    @Prop()
    passwordHash: string
}

export const UserSchema = SchemaFactory.createForClass(User);