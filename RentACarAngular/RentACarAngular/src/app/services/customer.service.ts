import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListResponseModel} from "../models/responseModels/listResponseModel";
import {Customer} from "../models/entityModels/customer";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = environment.apiUrl + "customers";

  constructor(private httpClient: HttpClient) {
  }

  getCustomers(): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl);
  }
}

