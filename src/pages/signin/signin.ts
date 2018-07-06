import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { FormBuilder,FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';



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
  // @ViewChild('username') username;
  // @ViewChild('password') password;
  credentialsForm: FormGroup;
  constructor(private formBuilder: FormBuilder,public loader: LoadingController,public toast: ToastController,public navCtrl: NavController, public navParams: NavParams,private auth:AuthProvider, public alertCtrl: AlertController) {
    this.credentialsForm = this.formBuilder.group({
      email: [
        '', Validators.compose([
          Validators.pattern('[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'),
          Validators.required
        ])
      ],
      password: [
        '', Validators.compose([
        // Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/),
        Validators.pattern(/^(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),      
          Validators.required
        ])
      ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  
  }

  signIn(){
    if(!this.credentialsForm.value.password || !this.credentialsForm.value.email){
      this.alert('Please fill in the details');      
    }
    else {
      let loading = this.loader.create({
        spinner: 'bubbles',
        duration: 1000
      });
      loading.present();
      const user = {
        email: this.credentialsForm.value.email,
        password: this.credentialsForm.value.password
      }
      this.auth.login(user).subscribe(
        (user)=>{
          console.log(user);
          if(user.msg ==='You are logged in'){

            this.alert('You are logged in');
            if(this.credentialsForm.value.email ){
              this.navCtrl.setRoot(TabsPage);
                this.navCtrl.popToRoot();
                }
              } else {
              this.alert(user.msg);                
              }
        },
        (error)=>{
          let e=error.json();
          console.log(e);          
          console.log(e.msg);
          console.log(error);
          loading.dismiss();
          this.toaster(e.msg);    
        }
      )
    }
  }
  oncreate(){
    this.navCtrl.push(RegisterPage)
  }
  alert(msg:string){
    this.alertCtrl.create({
      title: 'Info',
      subTitle: msg,
      buttons: ['OK']
    }).present();
  }
  toaster(message: string) {
    this.toast.create({
      message: message,
      duration: 3000
    }).present();
  }
}
