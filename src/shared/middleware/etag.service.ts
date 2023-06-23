import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EtagService {
  generateEtag(data: any): string {
    const jsonString = JSON.stringify(data);
    return crypto.createHash('sha256').update(jsonString).digest('hex');
  }
}
