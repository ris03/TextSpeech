import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { AboutPage } from '../about/about';
// import { BackgroundMode } from '@ionic-native/background-mode';

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
  ionViewWillLoad() {
    // this.tts.stop();
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
      if (!hasPermission) {
        this.speechRecognition.requestPermission()
        .then(
          () => {
          console.log('Granted'),
          this.tts.speak('Here you can try to speak correct options so that no wrong answer is recorded. Say a b c and d to practice and say stop to stop recording and go to test page');
          }
            // () =>             
          )
        }
     });
    }
    speak(){
      this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          this.text = matches[0];
        if(this.text==='stop'){
          this.speechRecognition.stopListening();
          this.navCtrl.push(AboutPage)
        }})
        }
  // private mic_off: any = {
  //   icon: 'mic',
  //   color: 'balance'
  // };
  // private mic_on: any = {
  //   icon: 'mic',
  //   color: 'danger'
  // };
  // private mic: any = this.mic_off;
  // private recognition: any;
  // private recognizing: Boolean;
  // @ViewChild('recognitionResult') recognitionResult: ElementRef;

  // private initializeRecognition = () => {
  //   if (!this.recognition) {
  //     return;
  //   }

  //   this.recognition.lang = "es-ES";
  //   this.recognition.continuous = true;
  //   this.recognition.interimResults = true;

  //   this.recognition.onstart = () => {
  //     console.log('[SpeechRecognition]', 'start');
  //     this.recognizing = true;
  //     this.recognitionResult.nativeElement.innerText = '';
  //   };

  //   this.recognition.onresult = (event) => {
  //     let results = Array.prototype.slice.call(event.results);
  //     let result = results.find((e) => {
  //       return !!e.isFinal || !!e[0].final;
  //     });

  //     if (result) {
  //       let resultText = result[0].transcript;
  //       console.log('[SpeechRecognition]', 'result', resultText);
  //       this.recognitionResult.nativeElement.innerText = resultText;
  //     }
  //   };

  //   this.recognition.onerror = (event) => {
  //     console.error(event);
  //   };

  //   this.recognition.onend = () => {
  //     console.log('[SpeechRecognition]', 'end');
  //     this.recognizing = false;
  //     this.mic = this.mic_off;
  //   };
  // };

  // constructor(public navCtrl: NavController, public platform: Platform) {
  //   this.recognition = null;
  //   this.recognizing = false;

  //   this.platform.ready().then((readySource) => {
  //     console.log('Platform ready from', readySource);
  //     let _window = (<any>window);
         
  //     if (this.platform.is('cordova')) {
  //       this.recognition = new _window.SpeechRecognition();
  //       this.initializeRecognition();
  //     } else {
  //       if (!('webkitSpeechRecognition' in window)) {
  //         alert('¡API SpeechRecognition no soportada!');
  //         return;
  //       }

  //       this.recognition = new _window.webkitSpeechRecognition();
  //       this.initializeRecognition();
  //     }
  //   });
  // }

  // processSpeech() {
  //   if (this.recognizing == false) {
  //     this.recognition.start();
  //     this.recognizing = true;
  //     this.mic = this.mic_on;
  //   } else {
  //     this.recognition.stop();
  //     this.recognizing = false;
  //     this.mic = this.mic_off;
  //   }
  // }
}
