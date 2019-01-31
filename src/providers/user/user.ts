import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {
  baseUrlUser: string = "http://localhost:3000/api/appUsers/";
  // baseUrlSpeech: string = "http://localhost:3000/api/appUsers/";

  userFirstName: string;

  constructor(public http: HttpClient) {}

  registerUser(user) {
    return this.http.post(this.baseUrlUser, user);
  }

  loginUser(user) {
    return this.http.post(this.baseUrlUser + "login", user);
  }

  logoutUser(token) {
    return this.http.post(this.baseUrlUser + "logout?access_token=" + token, {});
  }

  getUserInfo(userId, token) {
    return this.http.get(this.baseUrlUser + userId + "?access_token=" + token);
  }
  
  onGetUserInfo() {
    this.getUserInfo(window.sessionStorage.userId, window.sessionStorage.token)
    .subscribe((res: any) => {
      console.log("User info");
      console.log(res["firstName"]);
      this.userFirstName = res["firstName"];
    }, (err) => {
      console.log("Can't get user info");
      console.log(err);
    });
  }

  // Save speech
  saveSpeech(userId, token, speech) {
    return this.http.post(this.baseUrlUser + userId + "/speeches/?access_token=" + token, speech)
  }

  // Get speech
  getSpeech(userId, token) {
    return this.http.get(this.baseUrlUser + userId + "/speeches/?access_token=" + token);
  }
}