import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseModel} from '../models/responseModels/responseModel';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = environment.apiUrl + 'carimages/';

  constructor(private httpClient: HttpClient) {
  }

  deleteImageById(id: number): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'delete', {id: id});
  }
}
