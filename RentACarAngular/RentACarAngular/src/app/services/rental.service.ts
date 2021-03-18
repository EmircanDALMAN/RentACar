import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/responseModels/listResponseModel';
import {Rental} from '../models/entityModels/rental';
import {environment} from '../../environments/environment';
import {RentalDetail} from '../models/entityModels/RentalDetail';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = environment.apiUrl + 'rentals/';

  constructor(private httpClient: HttpClient) {
  }

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl + 'details');
  }

  getRentalByCar(id: number) {
    return this.httpClient.get<ListResponseModel<Rental>>
    (this.apiUrl + 'detailsbycar?id=' + id);
  }

  addRental(rental: RentalDetail): Observable<ListResponseModel<RentalDetail>> {
    return this.httpClient.post<ListResponseModel<RentalDetail>>(this.apiUrl + 'add', rental);
  }
}
