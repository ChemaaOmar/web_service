import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FilmsEntity } from '../films/films.entity';
import { Actors } from '../../shared/interfaces/actors';

@Entity('actors')
export class ActorsEntity implements Actors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  date_of_birth: Date;

  @Column({ nullable: true })
  date_of_death?: Date;

  @ManyToMany(() => FilmsEntity, (film) => film.actors)
  films: FilmsEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
