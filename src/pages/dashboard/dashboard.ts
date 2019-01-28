import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TextToSpeechOriginal } from '@ionic-native/text-to-speech';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  text: string = "";
  speedRate: number;
  language: string = "en-gb";

  tts: TextToSpeechOriginal;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  speak() {
    this.tts.speak({text: this.text, locale: this.language, rate: this.speedRate/10})
    .then(() => console.log("Success"))
    .catch((reason: any) => console.log(reason));
    console.log(this.language);
    console.log(this.speedRate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

}
