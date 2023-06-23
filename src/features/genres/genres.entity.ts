import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FilmsEntity } from '../films/films.entity';
import { Genres } from '../../shared/interfaces/genres';

@Entity('genres')
export class GenresEntity implements Genres {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => FilmsEntity, (film) => film.genre)
  films: FilmsEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
