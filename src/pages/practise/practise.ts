import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionsProvider } from '../../providers/questions/questions';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

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
  quesIndex:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public QuestionsProvider:QuestionsProvider)  {
  }

  ngOnInit() {
    console.log('ionViewDidLoad PractisePage');
    this.data=this.QuestionsProvider.getQues();
    this.questionArray=this.data.questions;     
    console.log("+++++++++++++",this.questionArray)
    
  }
  onNext()
  {
    this.quesIndex++;
  }
}
