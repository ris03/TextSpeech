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
      ],
      answer:'option A'
    },
      {
        question: 'Who is Chanakya Sethi ?',
        options :[
          'Best coder',
          'Awesome',
          'Too good to be true',
          'All of the above'
        ],
        answer: 'option B'
      },
      {
        question: 'Who is Chintu ?',
        options :[
          'Best coder',
          'Awesome',
          'Too good to be true',
          'None of the above'
        ],
        answer:'option C'
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
      return {qustion:[qq],index:this.index};
      // }
    }
    setAnswer(answer:any){
      this.answers.push(answer);
      if(this.questions[this.index].answer===answer){
        this.marks+=1;
      }
      this.index++;
  }
  getAnswer(){
    const data ={
      marks:this.marks,
      answers:this.answers,
      length:this.answers.length,
      length1:this.questions.length
    };
    return data;
  }

}
