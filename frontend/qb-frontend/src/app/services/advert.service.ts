import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Advert} from "../db/entity/advert";
import {HttpService} from "./http.service";
import {CacheService} from "./cache.service";
import {AdvertRest} from "../db/rest/advert.rest";

@Injectable({
  providedIn: 'root'
})
export class AdvertService extends HttpService {

  constructor(private _httpService: HttpClient, _cacheService: CacheService,) {
    super(_cacheService);
  }

  public createAdvert(advert: AdvertRest) {
    return this._httpService.post(this.LOCAL_URL + '/internal/advert/create', advert, this.createStandardHeaderWithAuthorization());
  }
}
