import { AnswerPage } from '../answer/answer';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { QuestionsProvider } from '../../providers/questions/questions';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Subscription } from 'rxjs/Subscription';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { timer } from 'rxjs/observable/timer';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { TestsProvider } from '../../providers/tests/tests';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
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
  visible:boolean=false;
  ans=this.TestsProvider.getAnswer();
  q:any
  w:any
  status:boolean[]=[false,false,false,false];
  tno:number=0;
  // id = this.navParams.get('idd');


  subscription: Subscription;

  constructor(public navCtrl: NavController,public tts: TextToSpeech,public speechRecognition: SpeechRecognition
          ,public viewController: ViewController,public TestsProvider:TestsProvider) {
            this.q=this.ans.length+1
            this.w=this.ans.length1;
            console.log('q',this.q)
            console.log('w',this.q)
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
            this.tts.speak('You selected option a')          
            .then(() => {
              this.ttstextmatch='option A';
              this.status[0]=true;
              this.tno++;
              this.TestsProvider.setAnswer(0);
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
              this.TestsProvider.setAnswer(1)              
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
              this.TestsProvider.setAnswer(2)              
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
              this.TestsProvider.setAnswer(3)
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
  let qus = this.TestsProvider.getQues();
  this.time=5;
  console.log('qqqqqq',qus)
  console.log(this.i)
  this.ques=qus.qustion[0].text;
  this.i=qus.index+1;
  console.log('i',this.i);
  console.log('index',qus.index);
  this.options=qus.qustion[0].options;
  console.log(this.ques);
  // this.optionA=qus.options[0]
  // this.optionB=qus.options[1]
  // this.optionC=qus.options[2]
  // this.optionD=qus.options[3]
  this.read(qus.qustion[0].text);
    // this.i++;
  }



   async read(TranslateText) : Promise<any> {
        try {
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
      // increase(){
      //   // this.j=0;
      //   if(this.i===3){
      //     this.i=0;
      //   } else{
      //     this.i++;
      //   }
      //   this.takeQuestion();
      // }
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
        this.navCtrl.setRoot(AnswerPage);
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
        this.TestsProvider.setAnswer(this.options[0]);
        this.takeQuestion();
        console.log('q',this.q)
        console.log('w',this.w)
      }
      skip(){
        this.TestsProvider.setAnswer('Not Answered');
        if(this.i==9){
          this.TestsProvider.saveAnswer().subscribe(()=>{

          })
          this.navCtrl.setRoot(AnswerPage);
          this.navCtrl.popToRoot();
        } else {
          this.takeQuestion();
        }
        console.log('q',this.q)
        console.log('w',this.w)
      }
      onFinish(){
        console.log('test finished')
        this.TestsProvider.setAnswer(this.options[0]); 
        this.TestsProvider.saveAnswer().subscribe(()=>{

        })

        // })       
        this.navCtrl.setRoot(AnswerPage);
        this.navCtrl.popToRoot();
      }
}
