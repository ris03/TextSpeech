import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import { AlertController } from 'ionic-angular'
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {
apiUrl: string = 'https://candidate-cfe.herokuapp.com';
// apiUrl: string = 'http://localhost:4000';
  public user:any;
  public authToken:any;
  constructor(public http: Http, public alertCtrl: AlertController,private storage: Storage
    // public navCtrl: NavController
  ) {
    console.log('Hello AuthProvider Provider');
  }
  _errorHandler(error: any) {
    console.error(error);
    if (error.status == 0) {      
        return Observable.throw({ _body: JSON.stringify({ msg: 'Server Not responding!!' }) });
    } else if (error.status > 400 && error.status < 500) {
      // this.alert('Something went wrong!!')
        return Observable.throw(error || { _body: JSON.stringify({ msg: 'Something went wrong!!' }) });
    }
    return Observable.throw(error || 'Server Error!!');
}



  registerUser(user: any){
    console.log("service",user)
    let headers=new Headers;
    headers.append('Content-Type','application/json');
    return this.http.post(this.apiUrl+'/users/register',user,{headers:headers}).map((res:Response) =>{
      return res.json();
    })
}
login(user){
    console.log('login== user',user);
    let headers=new Headers;
    headers.append('Content-Type','application/json');
    return this.http.post(this.apiUrl+'/users/authenticate',user,{headers:headers}) //JSON.stringify(user) = user
    .map((response:any) =>{
       console.log('login response',response);    
       console.log(response.json().user)
        // localStorage.setItem('id_token',response.json().token);
        // localStorage.setItem('user',JSON.stringify(response.json().user));     
        window.localStorage.setItem('user', JSON.stringify(response.json().user));
        window.localStorage.setItem('token', response.json().token);
        this.storage.set('user',JSON.stringify(response.json().user))
        this.storage.set('token',JSON.stringify(response.json().token))
         this.user=response.json().user;
         this.authToken=response.json().token;
         return response.json();
          
    })
    // .catch((this._errorHandler))
}
  onLogOut()
  {
    console.log("this.user");
    //  window.localStorage.clear();
    this.storage.remove('user')     
    this.storage.remove('token')     
     return true;
    }


}
