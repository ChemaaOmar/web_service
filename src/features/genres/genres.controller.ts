import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenreDto } from './dto/genres.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Genres')
@ApiBearerAuth('api-key')
@Controller('genre')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  getAllGenres() {
    return this.genresService.getAllGenres();
  }

  @Post()
  createGenre(@Body() createGenreDto: GenreDto) {
    return this.genresService.createGenre(createGenreDto);
  }

  @Delete(':id')
  deleteGenre(@Param('id') id: number) {
    return this.genresService.deleteGenre(id);
  }
}
