import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/responseModels/listResponseModel';
import {Car} from '../models/entityModels/car';
import {environment} from '../../environments/environment';
import {ResponseModel} from '../models/responseModels/responseModel';
import {OnlyCar} from '../models/entityModels/onlyCar';
import {SingleResponseModel} from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getCarsCount() {
    return this.httpClient.get(this.apiUrl + 'cars/count');
  }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/details';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getNowRentedCars() {
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + 'cars/getnowrented');
  }
  getNowRentedCarsCount() {
    return this.httpClient.get(this.apiUrl + 'cars/getnowrentedcount');
  }

  getBringNewestCar() {
    return this.httpClient.get<SingleResponseModel<Car>>(this.apiUrl + 'cars/getbringnewest');
  }

  getLastAddedCar() {
    return this.httpClient.get<SingleResponseModel<Car>>(this.apiUrl + 'cars/lastaddedcar');
  }

  getMostRentedCar(): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + 'cars/mostrented');
  }

  getOnlyCars(): Observable<ListResponseModel<OnlyCar>> {
    return this.httpClient.get<ListResponseModel<OnlyCar>>(this.apiUrl + 'cars/');
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/detailsbybrand?id=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/detailsbycolor?id=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetail(carId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/detailsbyid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByBrandAndColor(brandId: number, colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/CarsByBrandAndColor?brandId=' + brandId + '&colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  addCar(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'cars/add', car);
  }

  updateCar(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'cars/update', car);
  }

  removeCar(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'cars/delete', car);
  }
}

