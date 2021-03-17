import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListResponseModel} from "../models/responseModels/listResponseModel";
import {Color} from "../models/entityModels/color";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = environment.apiUrl + "colors";

  constructor(private httpClient: HttpClient) {
  }

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl);
  }
}
