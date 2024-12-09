import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { PhishingAttemptPage } from './models/phishing-page.model';
import { CreatePhishingDto } from './models/create-phishing.model';
import { PhishingAttempt } from './schemas/phishing.schema';
import { AuthGuard } from 'src/auth/auth-guard';

@Controller("/phishing")
export class PhishingController {
  constructor(private readonly appService: PhishingService) { }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  async getAllPhishingAttempts(
    @Query('page') page = 1,
    @Query('size') size = 10): Promise<PhishingAttemptPage<PhishingAttempt>> {
    return await this.appService.getAll(page, size);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post()
  async sendPhishing(@Body() request: CreatePhishingDto) {
    return await this.appService.sendPhishingEmail(request);
  }
}
