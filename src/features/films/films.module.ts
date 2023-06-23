import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsEntity } from './films.entity';
import { FilmsController } from './films.contoller';
import { FilmsService } from './films.service';
import { ActorsEntity } from '../actors/actors.entity';
import { GenresEntity } from '../genres/genres.entity';
import { FilmsRepository } from './films.repository';
import { EtagMiddlewareFilm } from '../../shared/middleware/etag.middleware';
import { EtagService } from '../../shared/middleware/etag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FilmsEntity, ActorsEntity, GenresEntity]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository, EtagService],
})
export class FilmsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EtagMiddlewareFilm).forRoutes(FilmsController);
  }
}
