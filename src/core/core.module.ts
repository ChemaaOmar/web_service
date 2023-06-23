import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { ActorsModule } from '../features/actors/actors.module';
import { FilmsModule } from '../features/films/films.module';
import { GenresModule } from '../features/genres/genres.module';
import { ApiKeyMiddleware } from '../shared/middleware/apikey.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [path.join(__dirname, '../features/**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    ActorsModule,
    FilmsModule,
    GenresModule,
  ],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
