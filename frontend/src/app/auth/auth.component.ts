import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../db/entity/user";
import {AuthService} from "./auth.service";
import {TokenConverter} from "../util/converter/token-converter";
import {CacheService} from "../services/cache.service";
import {CacheConst} from "../services/constants/cache.const";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public hide = true;
  private _user: User = new User();
  private readonly _form: FormGroup;

  get form(): FormGroup {
    return this._form;
  }

  get user(): User {
    return this._user;
  }

  constructor(private _authService: AuthService,
              private _cacheService: CacheService,
              private _router: Router) {
    this._form = new FormGroup({
      username: new FormControl({value: this._user.username, disabled: false}, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      password: new FormControl({value: this._user.password, disabled: false}, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  ngOnInit(): void {
  }


  onLogin() {
    this._user.username = this._form.controls['username'].value;
    this._user.password = this._form.controls['password'].value;
    this._authService.login(this._user).subscribe(response => {
      const tokens = TokenConverter.convertToEntityObject(response);
      this._cacheService.saveObject(CacheConst.ACCESS_TOKEN, tokens.accessToken);
      this._cacheService.saveObject(CacheConst.REFRESH_TOKEN, tokens.refreshToken);
      this._authService.setLoggedIn(true);
      this._router.navigateByUrl('/home').then();
    }, error => {
      this._authService.setLoggedIn(false);
    });
  }
}
