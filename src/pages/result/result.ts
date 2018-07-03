import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  ans:any
  ques:any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('userResponse'))
    this.ans=this.navParams.get('userResponse').answers;
    console.log(this.navParams.get('questionData'))
    this.ques=this.navParams.get('questionData')
    // console.log(this.ques.options);
    this.ques.forEach(element => {
      console.log(element.options)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }

}