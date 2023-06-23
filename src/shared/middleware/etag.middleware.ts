import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { EtagService } from './etag.service';
import { ActorsService } from '../../features/actors/actors.service';
import { FilmsService } from '../../features/films/films.service';

@Injectable()
export class EtagMiddlewareActor implements NestMiddleware {
  constructor(
    private readonly etagService: EtagService,
    private readonly actorService: ActorsService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.method !== 'PUT') return next();
    const actor = await this.actorService.getActorById(+req.params?.id);
    const lastHashEtag = this.etagService.generateEtag(actor);
    if (req.headers['if-match'] === lastHashEtag) {
      return next();
    }
    return res.status(412).send('Precondition Failed');
  }
}

@Injectable()
export class EtagMiddlewareFilm implements NestMiddleware {
  constructor(
    private readonly etagService: EtagService,
    private readonly filmsService: FilmsService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.method !== 'PUT') return next();
    const actor = await this.filmsService.getFilmById(+req.params?.id);
    const lastHashEtag = this.etagService.generateEtag(actor);
    if (req.headers['if-match'] === lastHashEtag) {
      return next();
    }
    return res.status(412).send('Precondition Failed');
  }
}
