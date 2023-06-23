import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  private readonly validApiKey = '8f94826adab8ffebbeadb4f9e161b2dc';

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['api-key'];

    if (apiKey !== this.validApiKey) {
      return res.status(401).json({ message: 'Invalid API Key' });
    }

    next();
  }
}
