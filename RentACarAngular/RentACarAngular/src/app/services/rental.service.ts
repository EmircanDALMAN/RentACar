import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListResponseModel} from "../models/responseModels/listResponseModel";
import {Rental} from "../models/entityModels/rental";
import {environment} from "../../environments/environment";

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
}
