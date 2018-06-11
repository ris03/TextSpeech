import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

/**
 * Generated class for the PracticeTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-practice-test',
  templateUrl: 'practice-test.html',
})
export class PracticeTestPage {
  text:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public tts: TextToSpeech,public speechRecognition: SpeechRecognition) {
  }
  ionViewWillEnter() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
        this.speechRecognition.requestPermission()
          .then(
            () => 
              console.log('Granted'),
            // () =>             
          )
        }
     });
    }
    speak(){
      this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          this.text = matches[0];})
        }

}
