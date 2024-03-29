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
import { ActorsService } from './actors.service';
import { ActorDto } from './dto/actors.dto';
import { ActorsEntity } from './actors.entity';
import { Response } from 'express';
import { EtagService } from '../../shared/middleware/etag.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Actors')
@ApiBearerAuth('api-key')
@Controller('actor')
export class ActorsController {
  constructor(
    private readonly actorsService: ActorsService,
    private readonly etagService: EtagService,
  ) {}

  @Get()
  getAllActors(): Promise<ActorsEntity[]> {
    return this.actorsService.getAllActors();
  }

  @Get(':id')
  async getActorById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    const autor = await this.actorsService.getActorById(id);
    res.set({
      ETag: this.etagService.generateEtag(autor),
    });
    res.send(autor);
  }

  @Post()
  createActor(@Body() createActorDto: ActorDto): Promise<ActorsEntity> {
    return this.actorsService.createActor(createActorDto);
  }

  @Put(':id')
  @ApiBearerAuth('etag')
  updateActor(
    @Param('id') id: number,
    @Body() updateActorDto: ActorDto,
  ): Promise<ActorsEntity | null> {
    return this.actorsService.updateActor(id, updateActorDto);
  }

  @Delete(':id')
  deleteActor(@Param('id') id: number): Promise<ActorsEntity | null> {
    return this.actorsService.deleteActor(id);
  }
}
