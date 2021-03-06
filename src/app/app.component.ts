import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';

import { TabsPage } from '../pages/tabs/tabs';
// import { AboutPage } from '../pages/about/about';
import { StarttestPage } from '../pages/starttest/starttest';
import { Storage } from '@ionic/storage';
import { AboutPage } from '../pages/about/about';
import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  loader:any;
  // rootPage:any = StarttestPage;
  showSplash=true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage: Storage) {
    platform.ready().then(() => {
      this.storage.get('token').then((token)=>{
        if(token){
          this.rootPage = TabsPage;
        } else {
          this.storage.get('introShown').then((result) => {
            if(result){
              this.rootPage = HomePage;
            } else {
              this.rootPage = IntroPage;
              this.storage.set('introShown', true);
            }
            // this.loader.dismiss();
          });
        }
      })
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      timer(3000).subscribe(()=>this.showSplash=false)
    });
  }
}
