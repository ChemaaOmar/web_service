import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmsEntity } from './films.entity';

export class FilmsRepository extends Repository<FilmsEntity> {
  constructor(
    @InjectRepository(FilmsEntity)
    private readonly filmsRepository: Repository<FilmsEntity>,
  ) {
    super(
      filmsRepository.target,
      filmsRepository.manager,
      filmsRepository.queryRunner,
    );
  }

  public async associateFilmToActors(
    filmId: number,
    actorIds: number[],
  ): Promise<void> {
    return this.filmsRepository
      .createQueryBuilder()
      .relation(FilmsEntity, 'actors')
      .of(filmId)
      .add(actorIds);
  }

  public async associateFilmToGenres(
    filmId: number,
    genreId: number,
  ): Promise<void> {
    return this.filmsRepository
      .createQueryBuilder()
      .relation(FilmsEntity, 'genre')
      .of(filmId)
      .set(genreId);
  }
}
