import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/responseModels/listResponseModel';
import {Brand} from '../models/entityModels/brand';
import {environment} from '../../environments/environment';
import {ResponseModel} from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = environment.apiUrl + 'brands/';

  constructor(private httpClient: HttpClient) {
  }

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl);
  }

  addBrand(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', brand);
  }

  updateBrand(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'update', brand);
  }

  getBrandById(id: number): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + 'id?id='+ id);
  }
}
