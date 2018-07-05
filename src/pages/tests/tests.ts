import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,App,AlertController } from 'ionic-angular';
import { TestsProvider } from '../../providers/tests/tests';
import { StarttestPage } from '../starttest/starttest';
import { QuestionsProvider } from '../../providers/questions/questions';
import { PractisestarttestPage } from '../practisestarttest/practisestarttest';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the TestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tests',
  templateUrl: 'tests.html',
})
export class TestsPage {
  tests: any = [];
  filteredTests: any = [];
  questions: any[] = [];
  reload: boolean = false;
  //COMPLETED TESTS TAB VARIABLE
  completedTests: any[] = [];
  filteredcompletedTests: any[] = [];
  practiseTests:any[]=[];
  x=this.QuestionsProvider.practisetests;
  constructor(public navCtrl: NavController, public navParams: NavParams,private testService: TestsProvider,
    private ldCtrl: LoadingController,public app: App,public QuestionsProvider:QuestionsProvider,
    public auth:AuthProvider,public alerCtrl: AlertController
) {
  }

  ionViewDidLoad() {
    // this.tests=this.QuestionsProvider.getQues();
    // console.log("Tests"+this.tests)
    console.log(this.x);
    console.log(this.x[0].testname);
    console.log('ionViewDidLoad TestsPagee');
    let loader = this.ldCtrl.create({
      spinner: 'crescent'
    });
    loader.present();

    this.testService.getAllTests().then((testsData: { assignedTest: any[], completedTest: any[] }) => {
      this.tests = testsData.assignedTest;
      console.log(testsData)
      // this.filteredTests = testsData.assignedTest;
      this.completedTests = testsData.completedTest;
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
  onProceed(id:string){
    console.log(id);
    console.log('ques id',this.tests[id]);
    console.log('ques id',this.tests[id]._id);
    this.testService.testname=this.tests[id].testName;
    this.testService.category=this.tests[id].category;
    this.testService.testId=this.tests[id]._id;
    this.testService.getAllQuestions(this.tests[id].questions).subscribe(
      (data)=>{
        console.log(data)
        this.app.getRootNav().setRoot(StarttestPage);
      }
    )
  }
  view(i:any){
   console.log(i);
   this.QuestionsProvider.get(i);
   this.app.getRootNav().setRoot(PractisestarttestPage);   
  }
  onLogout(){
    let method = this.alerCtrl.create({			
			message: 'Do you want to logout ?',
			buttons: [
				{
					text: 'Yes',
					cssClass: 'method-color',
					handler: () => {
						this.auth.onLogOut()
            this.app.getRootNav().setRoot(HomePage); 
					}
				},
				{
					text: 'No',
					cssClass: 'method-color',
					handler: () => {
						// console.log('Group clicked');
					}
				}
			]
		});
		method.present()
      
     
  }

}
