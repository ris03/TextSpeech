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
  index=0;
  marks=0;

  answers:any[]=[];
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
      },
      // {
      //   question: 'Who is Khushal ?',
      //   options :[
      //     'Best coder',
      //     'Awesome',
      //     'Too good to be true',
      //     'None of the above'
      //   ]
      // },
      // {
      //   question: 'Who is Rishi ?',
      //   options :[
      //     'Best coder',
      //     'Awesome',
      //     'Too good to be true',
      //     'None of the above'
      //   ]
      // },
      // {
      //   question: 'Who is Priyanka ?',
      //   options :[
      //     'Best coder',
      //     'Awesome',
      //     'Too good to be true',
      //     'None of the above'
      //   ]
      // }
    ]

  constructor(public http: Http) {
    console.log('Hello QuestionsProvider Provider');
  }
  getQues(){
    // if(index<this.questions.length){
      // let i = this.index;
      // this.index++;
      let qq = this.questions[this.index];
      return [qq];
      // }
    }
    getOptions(index:any){
      if(index<this.questions.length){
        return this.questions[index].options;
      }
    }
    setAnswer(answer:any){
      this.answers.push(answer);
      if(answer==='option A'){
        this.marks++;
      }
      this.index++;
  }
  getAnswer(){
    const data ={
      marks:this.marks,
      answers:this.answers
    };
    return data;
  }

}
