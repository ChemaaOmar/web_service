import { Injectable, NotFoundException } from '@nestjs/common';
import { GenresEntity } from './genres.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGenreDto } from './dto/genres.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(GenresEntity)
    private readonly genresRepository: Repository<GenresEntity>,
  ) {}

  async getAllGenres(): Promise<GenresEntity[]> {
    return this.genresRepository.find();
  }

  async createGenre(createGenreDto: CreateGenreDto): Promise<GenresEntity> {
    return this.genresRepository.save(createGenreDto);
  }

  async deleteGenre(id: number): Promise<any> {
    const genreToDelete = await this.genresRepository.findOne({
      where: { id },
    });
    if (!genreToDelete) throw new NotFoundException('Genre not found');
    return await this.genresRepository.remove(genreToDelete);
  }
}
