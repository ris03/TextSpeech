import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionsProvider } from '../../providers/questions/questions';
import { TabsPage } from '../tabs/tabs';
import { TestsProvider } from '../../providers/tests/tests';

/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage{
answers:any;
marks:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public qq: QuestionsProvider,public TestsProvider:TestsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
  }
  ionViewWillEnter() {
    let data =this.TestsProvider.getAnswer();
    this.answers=data.answers;
    this.marks=data.marks;
  }
  onStart(){
    this.navCtrl.setRoot(TabsPage);
    this.navCtrl.popToRoot();
  }
}
