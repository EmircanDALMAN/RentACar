import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {LoginModel} from '../models/entityModels/loginModel';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenModel} from '../models/responseModels/tokenModel';
import {ResponseModel} from '../models/responseModels/responseModel';
import {SingleResponseModel} from '../models/responseModels/singleResponseModel';
import {RegisterModel} from '../models/entityModels/registerModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl + 'auth/';

  constructor(private httpClient: HttpClient) {
  }

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'login', loginModel);
  }

  register(registerModel: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'register', registerModel);
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
