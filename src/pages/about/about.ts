import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { QuestionsProvider } from '../../providers/questions/questions';
import { TransferState } from '@angular/platform-browser/src/browser/transfer_state';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  i=0;
  ttstext:string=' ';
  ttstextmatch:string=' ';

  constructor(public navCtrl: NavController,public tts: TextToSpeech,public speechRecognition: SpeechRecognition,
  public qq: QuestionsProvider) {

  }
  ngOnInit() {
   
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
          this.takeQuestion()          
        }
  
     });
  
  }
  start() {
  
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          this.ttstext = matches[0];
          if(this.ttstext === 'a'||this.ttstext === 'hey') {
            this.tts.speak('You selected option a and it\'s the correct answer')          
            .then(() => this.ttstextmatch='option A')                        
            .catch((reason: any) => console.log(reason));
          } else if (this.ttstext === 'be' ||this.ttstext === 'b' ) {
            this.tts.speak('You selected option B and it\'s the incorrect answer')          
            .then(() => this.ttstextmatch='option B')                            
            .catch((reason: any) => console.log(reason));
          } else if (this.ttstext === 'see' ||this.ttstext === 'she'||this.ttstext === 'c') {
            this.tts.speak('You selected option C and it\'s the incorrect answer')          
            .then(() => this.ttstextmatch='option C')                            
            .catch((reason: any) => console.log(reason));
          } else if (this.ttstext === 'de'||this.ttstext === 'd') {
            this.tts.speak('You selected option D and it\'s the incorrect answer')          
            .then(() => this.ttstextmatch='option D')            
            .catch((reason: any) => console.log(reason));
          } else {
            this.tts.speak('your selected option is Not available')          
            .then(() => this.ttstextmatch='option not available')
            .catch((reason: any) => console.log(reason));
          }
        },
        (onerror) => console.log('error:', onerror)
      )
     
  }
  takeQuestion(){
  let qus = this.qq.getQues(this.i);
    this.read(qus);
    // this.i++;
  }



   async read(TranslateText) : Promise<any> {
        try {
          await this.tts.speak({
            text:TranslateText.question,
            rate: 0.8
          })
          .then(()=> this.tts.speak('Option A,'+TranslateText.options[0]))
          .then(()=> this.tts.speak('Option B '+TranslateText.options[1]))
          .then(()=> this.tts.speak('Option C'+TranslateText.options[2]))
          .then(()=> this.tts.speak('Option D'+TranslateText.options[3]))
          
        }
        catch (e) {
          console.log(e);
        }
      }
      increase(){
        // this.j=0;
        if(this.i===3){
          this.i=0;
        } else{
          this.i++;
        }
        this.takeQuestion();
      }
 
  

}