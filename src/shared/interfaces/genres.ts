import { Films } from './films';

export interface Genres {
  id: number;
  name: string;
  films: Films[];
}
