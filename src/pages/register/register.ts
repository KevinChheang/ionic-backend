import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../dashboard/dashboard';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  user = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public _api: UserProvider) {
    
  }

  onRegisterUser() {
    this._api.registerUser(this.user)
    .subscribe((res: any) => {
      console.log("Register successful")
      console.log(res);
      window.sessionStorage.setItem('token', res.token);
      window.sessionStorage.setItem('userId', res.userId);
      this.navCtrl.push(DashboardPage);
    }, (err) => {
      console.log("Error ocurred!");
    });
  }
}
