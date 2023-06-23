import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresEntity } from './genres.entity';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';

@Module({
  imports: [TypeOrmModule.forFeature([GenresEntity])],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
