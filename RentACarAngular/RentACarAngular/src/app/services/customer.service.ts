import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/responseModels/listResponseModel';
import {Customer} from '../models/entityModels/customer';
import {environment} from '../../environments/environment';
import {ResponseModel} from '../models/responseModels/responseModel';
import {CustomerDetail} from '../models/entityModels/customerDetail';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = environment.apiUrl + 'customers/';

  constructor(private httpClient: HttpClient) {
  }

  getCustomersCount() {
    return this.httpClient.get(this.apiUrl + 'count');
  }

  addCustomer(customer: Customer): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', customer);
  }

  updateCustomer(customer: Customer): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'update', customer);
  }

  removeCustomer(id: number): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'delete', {id: id});
  }

  getCustomersDetails(): Observable<ListResponseModel<CustomerDetail>> {
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(this.apiUrl + 'getdetails');
  }
}

