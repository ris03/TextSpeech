import { Component,ViewChild } from '@angular/core';
import { App,IonicPage, NavController, NavParams,AlertController ,LoadingController,ToastController} from 'ionic-angular';
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
  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams, 
    private sService: AuthProvider,public alertCtrl: AlertController,public loader: LoadingController,public toast: ToastController
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
        let loading = this.loader.create({
          spinner: 'bubbles',
          duration: 1000
        });
        loading.present();
        const user ={
          name:this.name.value,
          email:this.email.value,
          password:this.password.value,
        }
        this.sService.registerUser(user).subscribe(
          (user)=>{
            console.log('userrr',user)
            if(user.success){
              this.toaster(user.msg);
              // this.app.getRootNav().setRoot(SigninPage);

              loading.dismiss();      
              console.log('signed up user',user);
              // this.alert('You are registered!')          
            } else {
              this.alert(user.msg)                        
            }
            this.navCtrl.push(SigninPage);  
          },     
          (error)=>{
            console.log(error);
            loading.dismiss();
            this.toaster(error);    
          }
        )
      }
    }
  }
  onlogin(){
    this.navCtrl.push(SigninPage);
  }
  toaster(message: string) {
    this.toast.create({
      message: message,
      duration: 3000
    }).present();
  }
}
