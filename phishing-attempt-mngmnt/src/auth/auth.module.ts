import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { UserSchema } from './schemas/user.schema';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'users', schema: UserSchema }])],
    controllers: [AuthController],
    providers: [AuthService, JwtService, ConfigService],
})
export class AuthModule { }