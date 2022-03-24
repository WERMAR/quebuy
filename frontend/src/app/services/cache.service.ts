import {Injectable} from '@angular/core';
import {CacheConst} from "./constants/cache.const";

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private _cacheMap = new Map<CacheConst, Object>();

  constructor() {
  }

  public getObject(key: CacheConst) {
    return this._cacheMap.get(key);
  }

  public saveObject(key: CacheConst, data: Object) {
    this._cacheMap.set(key, data);
  }

  public removeObject(key: CacheConst) {
    this._cacheMap.delete(key);
  }

  public doesExist(key: CacheConst): boolean {
    return this._cacheMap.has(key);
  }

  public clean() {
    this._cacheMap.clear();
  }
}
