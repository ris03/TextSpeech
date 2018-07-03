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

// speechRs = speechRs || {};
// speechRs.speechinit = function(lang,cb,bcolor,color,pitch,rate){
//   this.speaker = new SpeechSynthesisUtterance();
//   this.speaker.pitch=pitch || 1;
//   this.speaker.rate=rate || 1;  
//   this.lan = lang;
//   var style = document.createElement('style');
//  style.type = 'text/css';
//  style.innerHTML = '.rsClass{background-color:'+(bcolor || "#4f91e6")+';color:'+(color || "#fff")+';}';
//  document.getElementsByTagName('head')[0].appendChild(style);
//   setTimeout(function(){
//   speechRs.speaker.voice = speechSynthesis.getVoices().
//     filter(function(voice) {  return voice.name == speechRs.lan; })[0];
//   },500);
//   if(lang == 'native'){
//  cb(this);
//   }else{
//     setTimeout(function(){
//   cb(speechRs)
//   },1000);
//   }
//  }
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
      // this.speechRecognition.startListening()
      // .subscribe(
      //   (matches: Array<string>) => {
      //     this.text = matches[0];})
      //   }
    }
  }
