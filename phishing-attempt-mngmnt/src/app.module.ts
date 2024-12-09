import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishingModule } from './phishings/phishing.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.MONGODB_URI, { dbName: process.env.DB_NAME }),
    PhishingModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }