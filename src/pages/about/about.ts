import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { QuestionsProvider } from '../../providers/questions/questions';
import { Subscription } from 'rxjs/Subscription';
import { timer } from 'rxjs/observable/timer';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { AnswerPage } from '../answer/answer';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  i=0;
  j=0;
  ttstext:string=' ';
  ttstextmatch:string=' ';
  time=5;
  source = timer(0, 1000);
  ques:any[];
  optionA:string=''
  optionB:string=''
  optionC:string=''
  optionD:string=''
  selectedQuestion:any;
  selectedIndex;
  visible:boolean=false;


  subscription: Subscription;

  constructor(public navCtrl: NavController,public tts: TextToSpeech,public speechRecognition: SpeechRecognition,
  public qq: QuestionsProvider,public viewController: ViewController) {

  }
  ionViewWillEnter() {
    this.j++;
    if(this.j<3){
      this.visible=false;
    }
    else{
      this.visible=true;
    }
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
          this.takeQuestion();
          // setInterval(()=>{
          //   this.i++;
          //   this.takeQuestion()
          // },40000)          
        }
  
     });
  
    }
    start() {
      this.subscription.unsubscribe();
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          this.ttstext = matches[0];
          if(this.ttstext === 'a'||this.ttstext === 'hey') {
            this.tts.speak('You selected option a and it\'s the correct answer')          
            .then(() => {
              this.ttstextmatch='option A';
              this.qq.setAnswer(this.ttstextmatch);
              // this.navCtrl.setRoot(AboutPage); 
              this.navCtrl.setRoot(this.navCtrl.getActive().component); 
              // this.viewController.fireWillEnter();             
              // this.takeQuestion();
            })                     
            .catch((reason: any) => console.log(reason));
          } else if (this.ttstext === 'be' ||this.ttstext === 'b' ) {
            this.tts.speak('You selected option B and it\'s the incorrect answer')          
            .then(() => {
              this.ttstextmatch='option B'
              this.qq.setAnswer(this.ttstextmatch)              
              this.navCtrl.setRoot(this.navCtrl.getActive().component); 
              
              // this.takeQuestion();
            })                            
            .catch((reason: any) => console.log(reason));
          } else if (this.ttstext === 'see' ||this.ttstext === 'she'||this.ttstext === 'c') {
            this.tts.speak('You selected option C and it\'s the incorrect answer')          
            .then(() => {
              this.ttstextmatch='option C'
              this.qq.setAnswer(this.ttstextmatch)              
              this.navCtrl.setRoot(this.navCtrl.getActive().component);               
              // this.takeQuestion();
            })                             
            .catch((reason: any) => console.log(reason));
          } else if (this.ttstext === 'de'||this.ttstext === 'd') {
            this.tts.speak('You selected option D and it\'s the incorrect answer')          
            .then(() => {
              this.ttstextmatch='option D'
              this.qq.setAnswer(this.ttstextmatch)              
              this.navCtrl.setRoot(this.navCtrl.getActive().component);               
              // this.takeQuestion();
            })            
            .catch((reason: any) => console.log(reason));
          } else {
            this.tts.speak('your selected option is Not available')          
            .then(() => {
              this.ttstextmatch='Option Not available'
              this.qq.setAnswer(this.ttstextmatch)              
              this.navCtrl.setRoot(this.navCtrl.getActive().component);               
              // this.takeQuestion();
            }) 
            .catch((reason: any) => console.log(reason));
          }
        },
        (onerror) => console.log('error:', onerror)
      )
     
  }
  takeQuestion(){
    // location.reload();
  let qus = this.qq.getQues();
  this.time=5;
  console.log(this.i)
  this.i++;
  this.j++;
  this.ques=qus
  console.log(this.ques.length);
  // this.optionA=qus.options[0]
  // this.optionB=qus.options[1]
  // this.optionC=qus.options[2]
  // this.optionD=qus.options[3]
  this.read(qus);
    // this.i++;
  }



   async read(TranslateText) : Promise<any> {
        try {
          await this.tts.speak({
            text:TranslateText[0].question,
            rate: 0.7
          })
          .then(()=> this.tts.speak('Option A,'+TranslateText[0].options[0]))
          .then(()=> this.tts.speak('Option B '+TranslateText[0].options[1]))
          .then(()=> this.tts.speak('Option C'+TranslateText[0].options[2]))
          .then(()=> this.tts.speak('Option D'+TranslateText[0].options[3]))
          .then(()=>{
              this.timer()
          })
          
        }
        catch (e) {
          console.log(e);
        }
      }
      vis(){
      
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
      timer(){
        // while(this.time>0){
        //   this.time--;
        // }

        // // this.takeQuestion();
        // this.start();
        this.subscription=this.source.subscribe(count=>{
          this.time--;
          if(this.time<1){
            this.start();
          }
        }

        )
      }
      onDone(){
        this.navCtrl.setRoot(AnswerPage)
        this.navCtrl.popToRoot();
      }
 
  

}