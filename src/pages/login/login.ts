import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user = {
    email: "",
    password: ""
  }
  constructor(public navCtrl: NavController, public _user: UserProvider) {}

  onLoginUser() {
    this._user.loginUser(this.user)
    .subscribe((res: any) => {
      console.log("Login is successful", res);
      window.sessionStorage.setItem("token", res.token);
      window.sessionStorage.setItem("userId", res.userId);
      this._user.onGetUserInfo();
      this.navCtrl.push(DashboardPage);
    }, (err) => {
      console.log(err);
      alert("Login failed.")
    });
  }
}
