import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/responseModels/listResponseModel';
import {Brand} from '../models/entityModels/brand';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = environment.apiUrl + "brands";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl);
  }
}
