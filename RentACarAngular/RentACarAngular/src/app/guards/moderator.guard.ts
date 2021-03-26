import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LocalStorageService} from '../services/local-storage.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ModeratorGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService,
              private toastrService: ToastrService,
              private router:Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.localStorageService.getItem('moderator')) {
      return true;
    }
    this.toastrService.info('Bu İşlemi Yapmaya Yetkiniz Yok. Yönlendiriliyorsunuz..');
    this.router.navigate(['/']);
    return false;
  }
}
