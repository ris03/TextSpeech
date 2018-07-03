import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionsProvider } from '../../providers/questions/questions';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { TestsProvider } from '../../providers/tests/tests';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Subscription } from 'rxjs/Subscription';
import { timer } from 'rxjs/observable/timer';
import { AnswerPage } from '../answer/answer';
import { PracCompPage } from '../prac-comp/prac-comp';



/**
 * Generated class for the PractisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-practise',
  templateUrl: 'practise.html',
})
export class PractisePage implements OnInit {
  questionArray:any=[];
  data:any;
  quesIndex:number=1;
  i:number=0;
  j=0;
  ttstext:string=' ';
  ttstextmatch:string=' ';
  time=5;
  source = timer(0, 1000);
  ques:any[];
  options:any[]=[]
  optionB:string=''
  optionC:string=''
  optionD:string=''
  selectedQuestion:any;
  selectedIndex;
  ans=this.QuestionsProvider.getAnswer();
  visible:boolean=false;
  q:any
  w:any
  status:boolean[]=[false,false,false,false];
  tno:number=0;
  k;

  subscription: Subscription;

  constructor(public navCtrl: NavController,public tts: TextToSpeech,public speechRecognition: SpeechRecognition
    ,public viewController: ViewController,public QuestionsProvider:QuestionsProvider)  {
      console.log(this.ans)
      this.q=this.ans.length+1
            this.w=this.ans.length1;
            console.log('q',this.q)
            console.log('w',this.w) 
  }
  ngOnInit() {
    console.log('ionViewDidLoad PractisePage');
    // console.log(this.ans);    
    this.data=this.QuestionsProvider.getQues();
    this.questionArray=this.data.questions;     
    console.log("+++++++++++++",this.questionArray);
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
        console.log('not granted');
      }

   });
    
  }

  takeQuestion(){
    // location.reload();
  let qus = this.QuestionsProvider.getQues();
  this.time=5;
  console.log('qqqqqq',qus)
  console.log(this.i)
  this.ques=qus.obj.question;
  console.log("Question in practise page",this.ques);  
  this.i=qus.index+1;
  console.log('i',this.i);
  console.log('index',qus.index);
  this.options=qus.obj.options;
  console.log("options in practise page",this.options);
  this.read(this.ques);
  }
 
  async read(TranslateText) : Promise<any> {
    console.log('question spoken'+TranslateText);
    
    try {
      console.log('question spoken'+TranslateText);
      await this.tts.speak({
        text:TranslateText,
        rate: 1
      })
      .then(()=> this.tts.speak('Option A,' +this.options[0]))
      .then(()=> this.tts.speak('Option B, '+this.options[1]))
      .then(()=> this.tts.speak('Option C,' +this.options[2]))
      .then(()=> this.tts.speak('Option D,' +this.options[3]))
      .then(()=>{
          this.timer()
      })
      
    }
    catch (e) {
      console.log(e);
    }
  }

  timer(){
    console.log("timer")
    this.subscription=this.source.subscribe(count=>{
      this.time--;
      if(this.time<1){
        this.start();
      }
    }
    )
  }
  start() {
    this.subscription.unsubscribe();
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          this.ttstext = matches[0];
          if(this.ttstext === 'a'||this.ttstext === 'hey') {
            this.tts.speak('You selected option a')          
            .then(() => {
              this.ttstextmatch='option A';
              this.status[0]=true;
              this.tno++;
              this.QuestionsProvider.setAnswer(this.options[0]);
              // this.q++;
              // this.navCtrl.setRoot(AboutPage); 
              this.navCtrl.setRoot(this.navCtrl.getActive().component); 
              // this.viewController.fireWillEnter();             
              // this.takeQuestion();
            })                     
            .catch((reason: any) => console.log(reason));
          } else if (this.ttstext === 'be' ||this.ttstext === 'b' ) {
            this.tts.speak('You selected option B')          
            .then(() => {
              this.ttstextmatch='option B';
              this.status[1]=true;
              this.tno++;
              this.QuestionsProvider.setAnswer(this.options[1])              
              this.navCtrl.setRoot(this.navCtrl.getActive().component); 
              
              // this.takeQuestion();
            })                            
            .catch((reason: any) => console.log(reason));
          } else if (this.ttstext === 'see' ||this.ttstext === 'she'||this.ttstext === 'c') {
            this.tts.speak('You selected option C')          
            .then(() => {
              this.ttstextmatch='option C';
              this.status[2]=true;
              this.tno++;
              this.QuestionsProvider.setAnswer(this.options[2])              
              this.navCtrl.setRoot(this.navCtrl.getActive().component);               
              // this.takeQuestion();
            })                             
            .catch((reason: any) => console.log(reason));
          } else if (this.ttstext === 'de'||this.ttstext === 'd') {
            this.tts.speak('You selected option D')          
            .then(() => {
              this.ttstextmatch='option D';
              this.status[3]=true;
              this.tno++;
              this.QuestionsProvider.setAnswer(this.options[3])
              this.navCtrl.setRoot(this.navCtrl.getActive().component);               
              // this.takeQuestion();
            })            
            .catch((reason: any) => console.log(reason));
          } else {
            this.tts.speak('your selected option is Not available')          
            .then(() => {
              this.ttstextmatch='Option Not available'
              // this.qq.setAnswer(this.ttstextmatch)              
              // this.navCtrl.setRoot(this.navCtrl.getActive().component);   
              this.start();            
              // this.takeQues tion();
            }) 
            .catch((reason: any) => console.log(reason));
          }
        },
        (onerror) => console.log('error:', onerror)
      )
     
  }

  onDone(){
    this.navCtrl.setRoot(PracCompPage);
    this.navCtrl.popToRoot();
  }
  cClick(i){
    if(this.tno===0){
      this.status[i]=true;
      this.tno++;
    } else{
      if(this.status[i]){
        this.status[i]=false;
        this.tno--;
      } else {
        this.status[i]=this.status[i];
      }
    }
    console.log(this.status)
  } 
  next(){
    console.log(this.options[0]);
    this.QuestionsProvider.setAnswer(this.options[0]);
    this.takeQuestion();
    console.log('q',this.q)
    console.log('w',this.w)
  }
  skip(){
    this.QuestionsProvider.setAnswer('Not Answered');
    if(this.i==this.w){      
      this.navCtrl.setRoot(PracCompPage);
      this.navCtrl.popToRoot();
    } else {
      this.takeQuestion();
    }
    console.log('q',this.q)
    console.log('w',this.w)
  }
  onFinish(){
    console.log('test finished')
    // this.QuestionsProvider.setAnswer(this.options[0]);       
    this.navCtrl.setRoot(PracCompPage);
    this.navCtrl.popToRoot();
  }
  // ansew(){
  //   this.QuestionsProvider.setAnswer(1);
  // }
}