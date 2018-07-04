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
  k=0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("UserResponse",this.navParams.get('userResponse'))
    this.ans=this.navParams.get('userResponse').answers;
    console.log("QuestionsData",this.navParams.get('questionData'))
    this.ques=this.navParams.get('questionData')
    // console.log(this.ques.options);
    this.ques.forEach(element => {
      console.log("1",element.options)
    });
    for(let j=0;j<this.ques.length;j++){
     if(this.ques[j].options[this.ques[j].answer] === this.ans[j]){
        this.k++;
        console.log("ify",this.ques[j].answer)
        
     } 
    console.log(this.ques[j].options[this.ques[j].answer])
     console.log(this.ans[j])
    console.log(this.ques[j].text)
    console.log(this.ques[j]._id)
    }
    console.log("value of k",this.k)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }

 



}
