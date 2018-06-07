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
        question: 'Which one of these is the national Anthem of India ?',
        options :[
          'Vande Matram',
          'Jai Ho',
          'Jaane Gaane Maane.......',
          'None of the above'
      ],
      answer:'option C'
    },
      {
        question: 'Who is the Prime Minister of India ?',
        options :[
          'Rahul Gandhi',
          'Lallu Prasad',
          'Arvind Kejriwal',
          'Narendra Modi'
        ],
        answer: 'option D'
      },
      {
        question: 'When is the next cricket 50-50 WC?',
        options :[
          '2019',
          '2020 ',
          '2021',
          '2022'
        ],
        answer:'option A'
      }
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
