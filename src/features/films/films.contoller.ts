import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsEntity } from './films.entity';
import { FilmDto } from './dto/films.dto';
import { EtagService } from '../../shared/middleware/etag.service';
import { Response } from 'express';

@Controller('film')
export class FilmsController {
  constructor(
    private readonly filmsService: FilmsService,
    private readonly etagService: EtagService,
  ) {}

  @Get()
  getAllFilms(): Promise<FilmsEntity[]> {
    return this.filmsService.getAllFilms();
  }

  @Get(':id')
  async getFilmById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    const film = await this.filmsService.getFilmById(id);
    res.set({
      ETag: this.etagService.generateEtag(film),
    });
    res.send(film);
  }

  @Post()
  createFilm(@Body() createFilmDto: FilmDto): Promise<FilmsEntity> {
    return this.filmsService.createFilm(createFilmDto);
  }

  @Put(':id')
  updateFilm(
    @Param('id') id: number,
    @Body() updateFilmDto: FilmDto,
  ): Promise<FilmsEntity | null> {
    return this.filmsService.updateFilm(id, updateFilmDto);
  }

  @Delete(':id')
  deleteFilm(@Param('id') id: number): Promise<FilmsEntity | null> {
    return this.filmsService.deleteFilm(id);
  }
}
