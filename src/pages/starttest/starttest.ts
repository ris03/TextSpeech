import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { timer } from 'rxjs/observable/timer';
import { BackgroundMode } from '@ionic-native/background-mode';
// import { App } from 'ionic-angular/components/app/app';


/**
 * Generated class for the StarttestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@IonicPage()
@Component({
  selector: 'page-starttest',
  templateUrl: 'starttest.html',
})
export class StarttestPage {
  instruction:string= 'All Questions are compulsory. Test contains total of 10 questions. Question and its options will be read to you. After that You will be provided 30 seconds to solve the question. After that Google Assistant will pop-up to record your answer. Speak your answer carefully. Once recorded, it can\'t be changed. Make sure you have a good internet connection. Make sure your microphone and speakers are in good working condition.To proceed press next or speak next or to listen the question again say repeat' 
  ttstext:string=' ';
  ttstextmatch:string=' ';
  speak:boolean=false
  // id = this.navParams.get('id');
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public speechRecognition : SpeechRecognition,
  public tts: TextToSpeech,private backgroundMode: BackgroundMode,public app: App) {
    this.backgroundMode.disable().then(()=>{
      this.tts.stop();
    })
  }
  ionViewWillEnter() {
  //   console.log('ionViewDidLoad StarttestPage');
  // }
  // ionViewWillEnter() {
    // console.log(this.id);
      this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
  
        if (!hasPermission) {
        this.speechRecognition.requestPermission()
          .then(
            () => 
              console.log('Granted'),
            // () =>             
          )
        } else {
          this.speak=true;
          this.readInstruction();
          // setInterval(()=>{
          //   this.i++;
          //   this.takeQuestion()
          // },40000)          
        }
  
     });
  
  
    }
    readInstruction(){
      if(this.speak){
        this.tts.speak({
          text:this.instruction,
          rate:1
        }).then(()=>{
          this.repeat();
        },
        (onerror) => console.log('error:', onerror)
      )
    }
  }
    ionViewDidLeave(){
    // this.tts.stop();      
    // this.speak=false;
    }
    // async read() : Promise<any> {
    //   try {
    //     await this.tts.speak({
    //       text:this.instruction,
    //       rate: 0.7
    //     })
    //   }
    //   catch (e) {
    //     console.log(e);
    //   }
    // }
  onstart(){
    // this.navCtrl.setRoot(AboutPage);
    // this.navCtrl.popToRoot();
    // this.navCtrl.push(AboutPage)
    // this.tts.stop();
    this.speak=false
    this.app.getRootNav().setRoot(AboutPage);

  }
  repeat(){
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          this.ttstext = matches[0];
       
          if(this.ttstext === 'start') {
            this.tts.speak('').then(()=>{
               this.onstart();                 
            })
          } else if (this.ttstext === 'repeat' ) {
            this.tts.speak('').then(()=>{
            this.readInstruction();
            })
          }else{
            this.tts.speak('Please speak again').then(()=>{
            this.repeat();             
            })
          }    
        })}
}
