import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActorsEntity } from './actors.entity';
import { CreateActorDto, UpdateActorDto } from './dto/actors.dto';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(ActorsEntity)
    private readonly actorsRepository: Repository<ActorsEntity>,
  ) {}

  async getAllActors(): Promise<ActorsEntity[]> {
    return this.actorsRepository.find();
  }

  async getActorById(id: number): Promise<ActorsEntity | undefined> {
    const actor = await this.actorsRepository.findOneBy({ id });
    if (!actor) throw new NotFoundException('Actor not found');
    return actor;
  }

  async createActor(createActorDto: CreateActorDto): Promise<ActorsEntity> {
    const newActor = this.actorsRepository.create(createActorDto);
    return this.actorsRepository.save(newActor);
  }

  async updateActor(
    id: number,
    updateActorDto: UpdateActorDto,
  ): Promise<ActorsEntity> {
    const actor = await this.getActorById(id);
    const updatedActor = this.actorsRepository.merge(actor, updateActorDto);
    return this.actorsRepository.save(updatedActor);
  }

  async deleteActor(id: number): Promise<ActorsEntity | null> {
    const actor = await this.getActorById(id);
    if (actor) {
      await this.actorsRepository.delete(id);
      return actor;
    }
    return null;
  }
}
