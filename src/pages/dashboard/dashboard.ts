import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TextToSpeech } from '@ionic-native/text-to-speech';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  text: string = "";
  speedRate: number;
  language: string = "en-gb";

  constructor(public navCtrl: NavController, public tts: TextToSpeech, 
    public _user: UserProvider) {
    
  }

  speak() {
    this.tts.speak({
      text: this.text, 
      locale: this.language, 
      rate: this.speedRate / 10
    })
    .then(() => console.log("Success"))
    .catch((reason: any) => {
      console.log(reason)
      alert("Speech isn't working.")
    });
    console.log(this.language);
    console.log(this.speedRate);
  }

  onLogoutUser() {
    this._user.logoutUser(window.sessionStorage.token)
    .subscribe((res: any) => {
      console.log("Logout successful");
      window.sessionStorage.clear();
      this.navCtrl.push(LoginPage);
    }, (err) => {
      console.log("Logout failed");
    })
  }
  
  ionViewDidLoad() {
  }

}
