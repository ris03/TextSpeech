import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the QuestionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionsProvider {
  questions:any []=[
      {
        question: 'Who let the dogs out ?',
        options :[
          'Oreo',
          'Maxxy',
          'Bruno',
          'None of the above'
      ]
    },
      {
        question: 'Who is Chanakya Sethi ?',
        options :[
          'Best coder',
          'Awesome',
          'Too good to be true',
          'All of the above'
        ]
      },
      {
        question: 'Who is Chintu ?',
        options :[
          'Best coder',
          'Awesome',
          'Too good to be true',
          'None of the above'
        ]
      }
    ]

  constructor(public http: Http) {
    console.log('Hello QuestionsProvider Provider');
  }
  getQues(index:number){
    // if(index<this.questions.length){
      return this.questions[index];
    // }
  }
  getOptions(index:any){
    if(index<this.questions.length){
      return this.questions[index].options;
    }
  }

}
