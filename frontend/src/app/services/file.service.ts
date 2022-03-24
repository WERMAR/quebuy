import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {CacheService} from "./cache.service";
import {FileRest} from "../db/entity/file.rest";
import {MessageRest} from "../db/rest/message.rest";

@Injectable({
  providedIn: 'root'
})
export class FileService extends HttpService {

  constructor(_cacheService: CacheService, private _httpService: HttpClient) {
    super(_cacheService);
  }

  uploadFiles(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    // @ts-ignore
    formData.append("reportProgress", true);
    return this._httpService.post<FileRest>(this.LOCAL_URL + '/internal/files/upload', formData, this.createStandardHeaderWithAuthorization());
  }

  deleteFile(fileName: string) {
    return this._httpService.delete<MessageRest>(this.LOCAL_URL + '/internal/files/' + fileName, this.createStandardHeaderWithAuthorization())
  }
}
