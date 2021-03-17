import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from "../models/responseModels/listResponseModel";
import {Car} from "../models/entityModels/car";
import {environment} from "../../environments/environment";
import {CarImage} from "../models/entityModels/carImage";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = environment.apiUrl +'';
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/details";
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarImages(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath= this.apiUrl + "carimages/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/detailsbybrand?id="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/detailsbycolor?id="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarDetail(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/detailsbyid?carId="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }


  // getImagesById(imageId:number):Observable<ListResponseModel<Car>>{
  //   let newPath = this.apiUrl + "/carImages/getbyid?id="+imageId
  //   return this.httpClient.get<ListResponseModel<Car>>(newPath)
  // }

  // //https://localhost:44356/api/cars/getbrandandcolor?brandId=1&colorId=1
  // getCarsByBrandandColor(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
  //   let newPath = this.apiUrl + "cars/getbrandandcolor?brandId="+brandId+"&?colorId="+colorId;
  //   return this.httpClient.get<ListResponseModel<Car>>(newPath);
  // }

}

