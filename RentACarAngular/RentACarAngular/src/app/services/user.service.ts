import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserFindeksModel} from '../models/entityModels/userFindeksModel';
import {Observable} from 'rxjs';
import {SingleResponseModel} from '../models/responseModels/singleResponseModel';
import {environment} from '../../environments/environment';
import {User} from '../models/entityModels/user';
import {ResponseModel} from '../models/responseModels/responseModel';
import {ListResponseModel} from '../models/responseModels/listResponseModel';
import {UserClaimsModel} from '../models/entityModels/userClaimsModel';
import {UserFindeksResponseModel} from '../models/responseModels/userFindeksResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl + 'users/';

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<ListResponseModel<User>> {
    return this.httpClient.get<ListResponseModel<User>>(this.apiUrl);
  }

  removeUser(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'delete', user);
  }

  getUserFindeks(userFindeksDto: UserFindeksModel):
    Observable<SingleResponseModel<UserFindeksResponseModel>> {
    return this.httpClient.post<SingleResponseModel<UserFindeksResponseModel>>
    (this.apiUrl + 'getuserfindeks', userFindeksDto);
  }

  getUser(email: string): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>
    (this.apiUrl + 'getuserbyemail?email=' + email);
  }

  updateUser(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>
    (this.apiUrl + 'update', {user: user, password: user.password});
  }

  updateUserForAuthorized(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>
    (this.apiUrl + 'updateforauthorized', user);
  }

  getUserById(id: number): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl + 'id?id=' + id);
  }

  getUserClaims(id: number): Observable<ListResponseModel<UserClaimsModel>> {
    return this.httpClient.get<ListResponseModel<UserClaimsModel>>
    (this.apiUrl + 'getuserclaims?id=' + id);
  }
}
