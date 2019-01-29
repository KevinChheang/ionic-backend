import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {
  baseUrl: string = "http://localhost:3000/api/appUsers/";

  constructor(public http: HttpClient) {}

  registerUser(user) {
    return this.http.post(this.baseUrl, user);
  }

  loginUser(user) {
    return this.http.post(this.baseUrl + "login", user);
  }

  logoutUser(token) {
    return this.http.post(this.baseUrl + "logout?access_token=" + token, {});
  }
}
