import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishingController } from './phishing.controller';
import { PhishingService } from './phishing.service';
import { PhishingAttemptSchema } from './schemas/phishing.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'phishing_attempts', schema: PhishingAttemptSchema }])],
    controllers: [PhishingController],
    providers: [PhishingService, JwtService],
})
export class PhishingModule { }