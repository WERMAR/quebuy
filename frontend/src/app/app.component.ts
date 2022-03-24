import {Component} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  onLogout() {
    this._authService.logout();
    this._router.navigateByUrl('/auth').then();
  }

  displayToolbar() {
    return this._router.url !== '/' && this._router.url !== '/auth';
  }
}
