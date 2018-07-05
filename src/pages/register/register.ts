import { Component,ViewChild } from '@angular/core';
import { App,IonicPage, NavController, NavParams,AlertController ,LoadingController,ToastController} from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder,FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';



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
  credentialsForm: FormGroup;
  // tab:Tabs;
  constructor(private formBuilder: FormBuilder,public app:App,public navCtrl: NavController, public navParams: NavParams, 
    private sService: AuthProvider,public alertCtrl: AlertController,public loader: LoadingController,public toast: ToastController
  ) {
  // this.tab=navCtrl.parent;    
  this.credentialsForm = this.formBuilder.group({
    name: [
      '', Validators.compose([
        Validators.pattern(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/),
        Validators.required
      ])
    ],
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
    ],
    cpassword: [
      '', Validators.compose([
        Validators.pattern(/^(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
        Validators.required
      ])
    ]
  });
}
onSignIn() {
  
  if (this.credentialsForm.valid) {
      console.log('form working',this.credentialsForm.value.email);
  }
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
    if(!this.credentialsForm.value.password ||!this.credentialsForm.value.email||!this.credentialsForm.value.password||!this.credentialsForm.value.cpassword){
      this.alert('Please fill in the details!')
    } else {
      if(this.credentialsForm.value.cpassword !== this.credentialsForm.value.password){
      this.alert('Passwords don\'t match!')        
      } else {
        let loading = this.loader.create({
          spinner: 'bubbles',
          duration: 1000
        });
        loading.present();
        const user ={
          name:this.credentialsForm.value.name,
          email:this.credentialsForm.value.email,
          password:this.credentialsForm.value.password
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
            let e = error.json();
            console.log(error);
            loading.dismiss();
            this.toaster(e.msg);    
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
  rg(){

  }
}
