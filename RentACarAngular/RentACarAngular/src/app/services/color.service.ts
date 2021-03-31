import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/responseModels/listResponseModel';
import {Color} from '../models/entityModels/color';
import {environment} from '../../environments/environment';
import {ResponseModel} from '../models/responseModels/responseModel';
import {SingleResponseModel} from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = environment.apiUrl + 'colors/';

  constructor(private httpClient: HttpClient) {
  }

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl);
  }

  removeColor(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'delete', color);
  }

  getColorById(id: number): Observable<SingleResponseModel<Color>> {
    return this.httpClient.get<SingleResponseModel<Color>>(this.apiUrl + 'id?id=' + id);
  }

  updateColor(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'update', color);
  }

  addColor(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', color);
  }
}
