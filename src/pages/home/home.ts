import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { SigninPage } from '../signin/signin';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public tts: TextToSpeech,public speechRecognition: SpeechRecognition,
  public alertCtrl: AlertController ) {

  }
  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: msg
    });
    alert.present();
  }
  ionViewDidLoad(){
    this.tts.speak('Welcome to uListen');
  }

  ngOnInit(){}

  signin(){
    this.navCtrl.push(SigninPage)
  }
  
  register(){
    this.navCtrl.push(RegisterPage)
  }

}
