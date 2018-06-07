import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { Storage } from '@ionic/storage';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage) {
  }
  goToHome(){
    this.navCtrl.setRoot(AboutPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

}
