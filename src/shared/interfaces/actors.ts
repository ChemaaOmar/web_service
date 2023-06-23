import { Films } from './films';

export interface Actors {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  date_of_death?: Date;
  films: Films[];
}
