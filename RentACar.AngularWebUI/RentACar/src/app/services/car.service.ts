import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Car} from '../models/car';
import {Photo} from '../models/photo';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) { }
  path = 'https://localhost:5001/api/';

  getCities(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(this.path + 'cars/getall');
  }
  getPhotosById(id: number): Observable<Photo[]>{
    return this.httpClient.get<Photo[]>(this.path + 'cars/images/' + id);
  }
}

