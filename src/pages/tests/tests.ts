import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,App } from 'ionic-angular';
import { TestsProvider } from '../../providers/tests/tests';
import { StarttestPage } from '../starttest/starttest';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private testService: TestsProvider,
    private ldCtrl: LoadingController,public app: App
) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad TestsPage');
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
    console.log('ques id',this.tests[id].qustions);
    this.testService.getAllQuestions(this.tests[id].questions).subscribe(
      (data)=>{
        console.log(data)
        this.app.getRootNav().setRoot(StarttestPage);
      }
    )
  }

}
