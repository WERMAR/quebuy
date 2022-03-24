import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {CacheService} from "./cache.service";
import {CacheConst} from "./constants/cache.const";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  LOCAL_URL = 'http://localhost:8080'

  constructor(private _cacheService: CacheService) {
  }

  public createStandardHeaderWithAuthorization() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this._cacheService.getObject(CacheConst.ACCESS_TOKEN)
      })
    };
  }
}
