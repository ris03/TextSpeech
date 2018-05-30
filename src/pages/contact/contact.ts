import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public options = {
    language: String,
    matches: Number,
    prompt: String,      // Android only
    showPopup : Boolean,  // Android only
    showPartial: Boolean 
  }
  bgcolor: string ='white';

  constructor(public navCtrl: NavController,public speechRecognition: SpeechRecognition) {

  }
//   ionViewDidLoad(){
//     // this.tts.speak('Hello BaahuBali')
//     // .then(() => console.log('Success'))
//     // .catch((reason: any) => console.log(reason));
  
// // Check feature available
// this.speechRecognition.isRecognitionAvailable()
//   .then((available: boolean) => console.log(available))

// // Start the recognition process
// this.speechRecognition.startListening(this.options)
//   .subscribe(
//     (matches: Array<string>) => console.log(matches),
//     (onerror) => console.log('error:', onerror)
//   )

// // Stop the recognition process (iOS only)
// this.speechRecognition.stopListening()

// // Get the list of supported languages
// this.speechRecognition.getSupportedLanguages()
//   .then(
//     (languages: Array<string>) => console.log(languages),
//     (error) => console.log(error)
//   )

// // Check permission
// this.speechRecognition.hasPermission()
//   .then((hasPermission: boolean) => console.log(hasPermission))

// // Request permissions
// this.speechRecognition.requestPermission()
//   .then(
//     () => console.log('Granted'),
//     () => console.log('Denied')
//   )
// }
ngOnInit() {

  this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {

      if (!hasPermission) {
      this.speechRecognition.requestPermission()
        .then(
          () => console.log('Granted'),
          () => console.log('Denied')
        )
      }

   });

}
start() {

  this.speechRecognition.startListening()
    .subscribe(
      (matches: Array<string>) => {
        this.bgcolor = matches[0];
      },
      (onerror) => console.log('error:', onerror)
    )

}
}
