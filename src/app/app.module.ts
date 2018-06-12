import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StarttestPage } from '../pages/starttest/starttest';
import { AnswerPage } from '../pages/answer/answer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { QuestionsProvider } from '../providers/questions/questions';
// import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { PracticeTestPage } from '../pages/practice-test/practice-test';
import { IntroPage } from '../pages/intro/intro';
import {IonicStorageModule} from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    StarttestPage,
    AnswerPage,
    PracticeTestPage,
    IntroPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule, 
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    StarttestPage,
    AnswerPage,
    PracticeTestPage,
    IntroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TextToSpeech,
    SpeechRecognition,
    QuestionsProvider,
    BackgroundMode
  ]
})
export class AppModule {}
