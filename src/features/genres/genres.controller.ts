import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/genres.dto';

@Controller('genre')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  getAllGenres() {
    return this.genresService.getAllGenres();
  }

  @Post()
  createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.createGenre(createGenreDto);
  }

  @Delete(':id')
  deleteGenre(@Param('id') id: number) {
    return this.genresService.deleteGenre(id);
  }
}
