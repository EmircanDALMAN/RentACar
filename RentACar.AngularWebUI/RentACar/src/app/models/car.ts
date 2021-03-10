import {Photo} from './photo';

export class Car {
  id!: number;
  brandId!: number;
  colorId!: number;
  modelYear!: number;
  dailyPrice!: number;
  description!: string;
  photos:Photo[] = [];
}
