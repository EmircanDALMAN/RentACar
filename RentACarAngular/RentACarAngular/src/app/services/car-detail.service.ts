import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ListResponseModel} from "../models/responseModels/listResponseModel";
import {Car} from "../models/entityModels/car";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  getCarDetailById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/detailsbyid?carId="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
}
