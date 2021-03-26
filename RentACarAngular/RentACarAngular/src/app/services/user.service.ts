import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserFindeksModel} from '../models/entityModels/userFindeksModel';
import {Observable} from 'rxjs';
import {SingleResponseModel} from '../models/responseModels/singleResponseModel';
import {environment} from '../../environments/environment';
import {User} from '../models/entityModels/user';
import {ResponseModel} from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl + 'users/';

  constructor(private httpClient: HttpClient) {
  }

  getUserFindeks(userFindeksModel: UserFindeksModel): Observable<SingleResponseModel<UserFindeksModel>> {
    return this.httpClient.post<SingleResponseModel<UserFindeksModel>>(this.apiUrl + 'getuserfindeks', userFindeksModel);
  }

  getUser(email: string): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl + 'getuserbyemail?email=' + email);
  }

  updateUser(user: User): Observable<ResponseModel> {

    return this.httpClient.post<ResponseModel>(this.apiUrl + 'update',
      {
        user:
          {
            'id': user.id,
            'firstName': user.firstName,
            'lastName': user.lastName,
            'email': user.email,
            'status':user.status
          },
        password: user.password
      }
    );
  }
}
