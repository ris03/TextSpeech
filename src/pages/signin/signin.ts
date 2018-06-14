import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  @ViewChild('username') username;
  @ViewChild('password') password;
  constructor(public navCtrl: NavController, public navParams: NavParams,private auth:AuthProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }
  alert(msg:string){
    this.alertCtrl.create({
      title: 'Info',
      subTitle: msg,
      buttons: ['OK']
    }).present();
  }
  signIn(){
    if(!this.username.value || !this.password.value){
      this.alert('Please fill in the details');      
    }
    else {
      const user = {
        email: this.username.value,
        password: this.password.value
      }
      this.auth.login(user).subscribe(
        (user)=>{
          console.log(user);
          if(user.msg==='You are logged in'){

            this.alert('You are logged in');
            if(this.username.value ){
              this.navCtrl.setRoot(TabsPage);
                this.navCtrl.popToRoot();
                }
              } else {
              this.alert(user.msg);                
              }
        }
      )
    }
  }
}
