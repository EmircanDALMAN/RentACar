import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseModel} from '../models/responseModels/responseModel';
import {environment} from '../../environments/environment';
import {CarImageAdd} from '../models/entityModels/carImageAdd';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = environment.apiUrl + 'carimages/';

  constructor(private httpClient: HttpClient) {
  }

  addImage(carImageAdd: CarImageAdd): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl, carImageAdd);
  }

  deleteImageById(imageId: number): Observable<ResponseModel> {
    console.log(imageId);
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'delete', {id: imageId});
  }
}
