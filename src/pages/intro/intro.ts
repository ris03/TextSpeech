import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';


/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage,public tts: TextToSpeech) {
  }
  goToHome(){
    this.navCtrl.setRoot(TabsPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
    setTimeout(()=>{
    this.tts.speak('Welcome to HandsFree');
       },3500)
  }
  goToSlide() {
    this.slides.slideTo(2, 500);
  }
  
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    if(currentIndex === 1){
        this.tts.speak('uListen lets the user to practise as well as give test with users voice.');         
    }else if(currentIndex === 2){
        this.tts.speak('Speak your heart out.');         
    }else if(currentIndex === 3){
        this.tts.speak('Results are shown as graphs.');         
    }else{
      this.tts.speak('Welcome to uListen');               
    }
  }
  onStart(){
    this.navCtrl.setRoot(TabsPage);    
  }
}
