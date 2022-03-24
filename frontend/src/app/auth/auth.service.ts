import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../db/entity/user";
import {CacheService} from "../services/cache.service";
import {CacheConst} from "../services/constants/cache.const";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpService: HttpClient, private _cacheService: CacheService) {
  }

  private _isLoggedIn = false;

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  public setLoggedIn(isLoggedIn: boolean) {
    this._isLoggedIn = isLoggedIn;
  }

  public login(user: User) {
    const body = new URLSearchParams();
    body.set('username', user.username);
    body.set('password', user.password);
    return this._httpService.post('http://localhost:8080/login', body, AuthService.getLoginHeader());
  }


  public logout() {
    this._cacheService.clean();
    this._isLoggedIn = false;
  }

  private static getLoginHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
  }
}
