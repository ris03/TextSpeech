import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // text:any
  
 ttstext:string=' '
 text: any;
  constructor(public navCtrl: NavController,public tts: TextToSpeech,public speechRecognition: SpeechRecognition,
  public alertCtrl: AlertController ) {

  }
  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: msg,
      // buttons: ['Dismiss']
    });
    alert.present();
  }
  ngOnInit() {

    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
  
        if (!hasPermission) {
        this.speechRecognition.requestPermission()
          .then(
            () => console.log('Granted'),
            () => console.log('Denied')
          )
        }
  
     });
  
  }
  start() {
  
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          this.ttstext = matches[0];
          this.speak()
          // this.text = matches;
          // if(matches[0] === "does kushal loves gursimran ?")
          // {
          //   this.presentAlert('yes  <3 !!!!')
          // } else {
          //   this.presentAlert('It\'s Khushal and he loves gursimran')            
          // }
        },
        (onerror) => console.log('error:', onerror)
      )
  
  }
  // ionViewDidLoad(){
  //   this.tts.speak('Hello BaahuBali')
  //   .then(() => console.log('Success'))
  //   .catch((reason: any) => console.log(reason));
  // }
  // ionViewDidEnter(){
  //   this.tts.speak('Raat jaavan mast samaan, aise meh honton seh hont ye mila jisme tera aur yeh aada, saaseh sulagti hai hosh kaha meri bahuun mein aau zara, meri dhadkan meh samao zara meri ulfat mein bikar jau, jalne do behakne do sun yeh majalti ragani, jaise teri aada jazbaat ke yeh mastiya tera hi hai nasha lemme love you (down, down down), all night (long long long) i wanna turn you (on on on), charne do yeh nasha')
  //   .then(() => console.log('Success'))
  //   .catch((reason: any) => console.log(reason));
  // }
  speak(){
    if(this.ttstext === 'a'||this.ttstext === 'hey') {
      this.tts.speak('You selected option a')          
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
    } else if (this.ttstext === 'be' ||this.ttstext === 'b' ) {
      this.tts.speak('You selected option B')          
      // .then(() => this.ttstext='You slelected wrong option')
      .then(() => console.log('Success'))      
      .catch((reason: any) => console.log(reason));
    } else if (this.ttstext === 'see' ||this.ttstext === 'she'||this.ttstext === 'c') {
      this.tts.speak('You selected option B')          
      // .then(() => this.ttstext='You slelected wrong option')
      .then(() => console.log('Success'))      
      .catch((reason: any) => console.log(reason));
    } else if (this.ttstext === 'de'||this.ttstext === 'd') {
      this.tts.speak('You selected option D')          
      // .then(() => this.ttstext='You slelected wrong option')
      .then(() => console.log('Success'))      
      .catch((reason: any) => console.log(reason));
    } else {
      this.tts.speak('You selected wrong option')          
      .then(() => this.ttstext='You slelected wrong option')
      .catch((reason: any) => console.log(reason));
    }
      // this.tts.speak('Hello BaahuBali')
    
  }
  async sayText():Promise<any>{
    try{  
      await this.tts.speak('Hello Hello Hello Hello Hello Hello Hello Hello Hello');
      console.log('bol dia bc');
    } catch (e){
      console.log(e);
    }
  }
}
