import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionsProvider } from '../../providers/questions/questions';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the PracCompPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prac-comp',
  templateUrl: 'prac-comp.html',
})
export class PracCompPage {
  answers=[]
  marks:any
  quess=[]
  constructor(public navCtrl: NavController, public navParams: NavParams, public ques: QuestionsProvider) {
  }

  
  ionViewDidLoad() {
    let data =this.ques.getAnswer();
    // this.answers=data.answers;
    // console.log(data)
    data.answers.forEach(aa => {
      this.answers.push(aa.a)
      this.quess.push(aa.q)
    });
    this.marks=data.marks;
    console.log(this.answers)
    console.log(this.quess)
    console.log(this.marks)
  }
  onStart(){
    this.navCtrl.setRoot(TabsPage);
    this.navCtrl.popToRoot();
  }

}
