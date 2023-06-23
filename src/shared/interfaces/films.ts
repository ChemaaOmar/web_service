import { Actors } from './actors';

export interface Films {
  id: number;
  name: string;
  synopsis: string;
  release_year?: number;
  genre: any;
  actors: Actors[];
}
