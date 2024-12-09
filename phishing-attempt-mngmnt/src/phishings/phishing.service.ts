import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhishingAttemptPage } from './models/phishing-page.model';
import { CreatePhishingDto } from './models/create-phishing.model';
import { PhishingAttempt } from './schemas/phishing.schema';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel('phishing_attempts') private phishingAttemptModel: Model<PhishingAttempt>,
    private configService: ConfigService) { }

  async getAll(page: number, size: number): Promise<PhishingAttemptPage<PhishingAttempt>> {
    const totalCount = await this.phishingAttemptModel.countDocuments();
    const phishingAttemptData = await this.phishingAttemptModel.find()
      .limit(size)
      .skip((page - 1) * size)
      .sort({ createdAt: -1 });
    const hasNext = page * size < totalCount;

    return new PhishingAttemptPage<PhishingAttempt>(
      phishingAttemptData,
      hasNext
    )
  }

  async sendPhishingEmail(request: CreatePhishingDto) {
    try {
      let response = await axios.post<PhishingAttempt>(this.configService.get("PHISHING_SIMULATION_BASE_URL") + "/phishing/send", request,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Key': this.configService.get("PHISHING_SIMULATION_ACCESS_KEY")
          }
        })

      return response.data;
    } catch (error) {
      let status = error.request.res.statusCode;
      let message = error.request.res.statusMessage;
      if (status === 401)
        throw new UnauthorizedException(message)
      throw new Error(`Failed to send phishing email. Service responded with: ${status} - ${JSON.stringify(message)}`);
    }
  }
}