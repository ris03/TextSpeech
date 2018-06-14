import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('name') name
  @ViewChild('email') email
  @ViewChild('password') password
  @ViewChild('cpassword') cpassword
  // tab:Tabs;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private sService: AuthProvider,public alertCtrl: AlertController
  ) {
  // this.tab=navCtrl.parent;    
  }
  alert(msg:string){
    this.alertCtrl.create({
      title: 'Info',
      subTitle: msg,
      buttons: ['OK']
    }).present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  onRegister(){
    if(!this.name.value ||!this.email.value||!this.password.value||!this.cpassword.value){
      this.alert('Please fill in the details!')
    } else {
      if(this.cpassword.value !== this.password.value){
      this.alert('Passwords don\'t match!')        
      } else {
        const user ={
          name:this.name.value,
          email:this.email.value,
          password:this.password.value,
        }
        this.sService.registerUser(user).subscribe(
          (user)=>{
            console.log('userrr',user)
            if(user.success){
              console.log('signed up user',user);
              this.alert('You are registered!')          
              this.navCtrl.push(SigninPage);    
            } else {
              this.alert(user.msg)                        
            }
          },     
          (error)=>{
            console.log(error);
          }
        )
      }
    }
  }

}
