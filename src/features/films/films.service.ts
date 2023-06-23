import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmsEntity } from './films.entity';
import { FilmDto } from './dto/films.dto';
import { ActorsEntity } from '../actors/actors.entity';
import { GenresEntity } from '../genres/genres.entity';
import { FilmsRepository } from './films.repository';

@Injectable()
export class FilmsService {
  constructor(
    private readonly filmsRepository: FilmsRepository,
    @InjectRepository(ActorsEntity)
    private readonly actorsRepository: Repository<ActorsEntity>,
    @InjectRepository(GenresEntity)
    private readonly genresRepository: Repository<GenresEntity>,
  ) {}

  async getAllFilms(): Promise<FilmsEntity[]> {
    return this.filmsRepository.find({ relations: ['genre', 'actors'] });
  }

  async getFilmById(id: number): Promise<FilmsEntity | undefined> {
    const films = await this.filmsRepository.findOne({
      where: { id },
      relations: ['genre', 'actors'],
    });
    if (!films) throw new NotFoundException('Film not found');
    return films;
  }

  async createFilm(createFilmDto: FilmDto): Promise<any> {
    try {
      const newFilm = await this.filmsRepository.save(createFilmDto);
      await this.filmsRepository.associateFilmToActors(
        newFilm.id,
        createFilmDto.actor_ids,
      );
      await this.filmsRepository.associateFilmToGenres(
        newFilm.id,
        createFilmDto.genre_id,
      );
      return this.filmsRepository.findOneOrFail({
        where: { id: newFilm.id },
        relations: ['genre', 'actors'],
      });
    } catch (err) {
      if (err.errno === 19)
        throw new NotFoundException('Actor or genre not found');
      throw err;
    }
  }

  async updateFilm(id: number, updateFilmDto: FilmDto): Promise<any> {
    const filmToUpdate = await this.filmsRepository.findOneOrFail({
      where: { id },
      relations: ['genre', 'actors'],
    });
    if (updateFilmDto.actor_ids) {
      const actors = await this.actorsRepository.findByIds(
        updateFilmDto.actor_ids,
      );
      if (actors.length !== updateFilmDto.actor_ids.length)
        throw new NotFoundException('Actor not found');
      filmToUpdate.actors = actors;
      delete updateFilmDto.actor_ids;
    }
    if (updateFilmDto.genre_id) {
      const genre = await this.genresRepository.findOne({
        where: { id: updateFilmDto.genre_id },
      });
      if (!genre) throw new NotFoundException('Genre not found');
      filmToUpdate.genre = genre;
      delete updateFilmDto.genre_id;
    }
    const updatedFilm = this.filmsRepository.merge(filmToUpdate, updateFilmDto);
    return await this.filmsRepository.save(updatedFilm);
  }

  async deleteFilm(id: number): Promise<FilmsEntity | null> {
    const film = await this.getFilmById(id);
    await this.filmsRepository.delete(id);
    return film;
  }
}
