import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,App} from 'ionic-angular';
import { TestsProvider } from '../../providers/tests/tests';
import { ResultPage } from '../../pages/result/result';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';



/**
 * Generated class for the CompletedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-completed',
  templateUrl: 'completed.html',
})
export class CompletedPage {

  tests: any = [];
  filteredTests: any = [];
  questions: any[] = [];
  reload: boolean = false;
  //COMPLETED TESTS TAB VARIABLE
  completedTests: any[] = [];
  filteredcompletedTests: any[] = [];
  data1:any;

  constructor(public app: App,public navCtrl: NavController, public navParams: NavParams,
      public TestsProvider:TestsProvider,private ldCtrl: LoadingController, public auth:AuthProvider) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad CompletedPage');
    this.TestsProvider.getresult().subscribe(
      (res)=>{
        this.data1=res;
        console.log(this.data1); 
      })  
      let loader = this.ldCtrl.create({
        spinner: 'crescent'
      });
      loader.present();
      this.TestsProvider.getAllTests().then((testsData: { assignedTest: any[], completedTest: any[] }) => {
        this.tests = testsData.assignedTest;
        console.log(testsData.assignedTest)
        console.log('111111111111111111111'+JSON.stringify(testsData))
        // this.filteredTests = testsData.assignedTest;
        this.completedTests = testsData.completedTest;
        console.log(testsData.completedTest)
        // this.filteredcompletedTests = testsData.completedTest;
        this.reload = false;
        loader.dismiss();
  
      }).catch((err) => {
        loader.dismiss();
        loader.onDidDismiss(() => {
          // this.toastCreator('Unable to load Tests. Please try again.');
          this.reload = true;
  
        });
      });
  }
  viewResult(id:string){
    let q :any;
    console.log(id);
    console.log('ques id',this.data1[id]);
    this.TestsProvider.testId=this.data1[id].testID;
    this.tests.forEach(t => {
      if(t._id===this.data1[id].testID){
        console.log('testID',t._id)
        console.log('testID',t.questions)
        q=t.questions;
        console.log('test ID',this.data1[id].testID)
      }
    });
    this.TestsProvider.getAllQuestions(q).subscribe(
      (data)=>{
        console.log(data)
        // this.app.getRootNav().setRoot(ResultPage,{questionData:data,userResponse:this.data1[id]});
        this.navCtrl.push(ResultPage,{
          questionData:data,
          userResponse:this.data1[id]
        })
      }
    )
  }
  onLogout(){
    this.auth.onLogOut()
    this.app.getRootNav().setRoot(HomePage);   

      
  }
}

