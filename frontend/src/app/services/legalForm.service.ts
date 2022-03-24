import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Organization} from "../db/entity/organization";
import {HttpClient} from "@angular/common/http";
import {CacheService} from "./cache.service";
import {FileService} from "./file.service";
import {OrganizationRest} from "../db/rest/organization.rest";

@Injectable({
  providedIn: 'root'
})
export class LegalFormService extends HttpService {

  constructor(private _httpService: HttpClient, _cacheService: CacheService, private _fileService: FileService) {
    super(_cacheService);
  }


  public getLegalForms() {
    return this._httpService.get<string[]>(this.LOCAL_URL + '/internal/legalForm', this.createStandardHeaderWithAuthorization());
  }

}
