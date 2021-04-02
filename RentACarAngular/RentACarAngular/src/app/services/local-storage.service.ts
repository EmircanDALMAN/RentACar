import {Injectable} from '@angular/core';
import {TokenModel} from '../models/responseModels/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  tokenKey: string = 'token';

  constructor() {
  }

  setToken(tokenValue: TokenModel) {
    localStorage.setItem(this.tokenKey, JSON.stringify(tokenValue));
  }

  getToken(): TokenModel {
    return JSON.parse(localStorage.getItem(this.tokenKey));
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  getItem(key: string) {
    var item = localStorage.getItem(key);
    if (item != null) {
      return item;
    } else {
      return null;
    }
  }

  clearAll() {
    localStorage.clear();
  }

  setItem(key: string, value: string) {
    if (this.getItem(key) == null) {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string) {
    if (this.getItem(key) != null) {
      localStorage.removeItem(key);
    }
  }
}
