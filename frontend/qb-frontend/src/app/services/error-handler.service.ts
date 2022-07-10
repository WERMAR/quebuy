import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ErrorType} from "../util/const/error-type.enum";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private _toastrService: ToastrService) {
  }

  forbidden(errorType: ErrorType) {
    this._toastrService.error(ErrorHandlerService.createMessageForType(errorType), ErrorHandlerService.createTitleForType(errorType));
  }

  default() {
   this._toastrService.error(ErrorHandlerService.createMessageForType(ErrorType.DEFAULT), ErrorHandlerService.createTitleForType(ErrorType.DEFAULT))
  }

  private static createMessageForType(errorType: ErrorType) {
    switch (errorType) {
      case ErrorType.FORBIDDEN_LOGIN:
        return "Bitte Eingaben kontrollieren und wiederholen."
      default:
        return "Ups das tut uns leid, wenden Sie sich bitte an den Support!";
    }
  }

  private static createTitleForType(errorType: ErrorType){
    switch (errorType) {
      case ErrorType.FORBIDDEN_LOGIN:
        return "Benutzername oder Passwort falsch"
      default:
        return "Unbekannter Fehler";
    }
  }
}
