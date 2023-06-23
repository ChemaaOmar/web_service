import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsEntity } from './actors.entity';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { EtagService } from '../../shared/middleware/etag.service';
import { EtagMiddlewareActor } from '../../shared/middleware/etag.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([ActorsEntity])],
  controllers: [ActorsController],
  providers: [ActorsService, EtagService],
})
export class ActorsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EtagMiddlewareActor).forRoutes(ActorsController);
  }
}
