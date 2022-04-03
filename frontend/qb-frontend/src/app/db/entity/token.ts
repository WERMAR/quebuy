export class Token {
  private access_token: string;
  private refresh_token: string;


  set accessToken(access_token: string) {
    this.access_token = access_token;
  }

  set refreshToken(refresh_token: string) {
    this.refresh_token = refresh_token;
  }

  get accessToken() {
    return this.access_token;
  }

  get refreshToken() {
    return this.refresh_token;
  }

  constructor() {
    this.access_token = '';
    this.refresh_token = '';
  }
}
