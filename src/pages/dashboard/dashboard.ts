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
  speechArr = [];
  text: any = {
    speech: ""
  };
  speedRate: number = 1;
  language: string = "en-gb";

  constructor(public navCtrl: NavController, public tts: TextToSpeech, 
    public _user: UserProvider) {
    
  }

  speak() {
    this.tts.speak({
      text: this.text.speech, 
      locale: this.language, 
      rate: this.speedRate / 10
    })
    .then(() => console.log("Success"))
    .catch((reason: any) => {
      console.log(reason)
      alert("Speech isn't working.")
    });
    // console.log(this.language);
    // console.log(this.speedRate);
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

  onSaveSpeech() {
    this._user.saveSpeech(window.sessionStorage.userId, window.sessionStorage.token, this.text)
    .subscribe((res: any) => {
      console.log("Speech saved successfully.")
      console.log(this.text);
      console.log(res["speech"]);
      this.onGetSpeech();
    }, (err) => {
      console.log(err);
      alert("Save speech failed.")
    });
  }

  onGetSpeech() {
    this._user.getSpeech(window.sessionStorage.userId, window.sessionStorage.token)
    .subscribe((res: any) => {
      console.log("Get speech successfully");
      console.log(res);
      this.speechArr = [];
      for(let i = 0; i < res.length; i++) {
        this.speechArr.push(res[i]["speech"]);
      }
    }, (err) => {
      alert("Can't retrieve speech.")
    });
  }
  
  ionViewDidLoad() {
  }

}
