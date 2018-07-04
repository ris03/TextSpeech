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
  qIndex=0;
  answers:any[]=[];
  practisetests:any=[{
  testname:'Test 1',
  category:'General knowledge',
  duration:'5',  
  ques:[]=[
      {
        question: 'Which one of these is the national Anthem of India ?',
        options :[
          'Vande Matram',
          'Jai Ho',
          'Jaane Gaane Maane.......',
          'None of the above'
      ],
  answer:'Jaane Gaane Maane.......'
    },
      {
        question: 'Who is the Prime Minister of India ?',
        options :[
          'Rahul Gandhi',
          'Lallu Prasad',
          'Arvind Kejriwal',
          'Narendra Modi'
        ],
        answer: 'Narendra Modi'
      },
      {
        question: 'When is the next cricket 50-50 WC?',
        options :[
          '2019',
          '2020 ',
          '2021',
          '2022'
        ],
        answer:'2019'
      }
    ]
  },{
    testname:'Test 2',
    category:'General knowledge',
    duration:'5',  
    ques:[]=[
        {
          question: 'Which one of these is the national Anthem of India ?',
          options :[
            'Vande Matram',
            'Jai Ho',
            'Jaane Gaane Maane.......',
            'None of the above'
        ],
    answer:'Jaane Gaane Maane.......'
      },
        {
          question: 'Who is the Prime Minister of India ?',
          options :[
            'Rahul Gandhi',
            'Lallu Prasad',
            'Arvind Kejriwal',
            'Narendra Modi'
          ],
          answer:'Narendra Modi'
        },
        {
          question: 'When is the next cricket 50-50 WC?',
          options :[
            '2019',
            '2020 ',
            '2021',
            '2022'
          ],
          answer:'2019'
        }
      ]
    },{
      testname:'Test 3',
      category:'General knowledge',
      duration:'5',  
      ques:[]=[
          {
            question: 'Which one of these is the national Anthem of India ?',
            options :[
              'Vande Matram',
              'Jai Ho',
              'Jaane Gaane Maane.......',
              'None of the above'
          ],
      answer:'Jaane Gaane Maane.......'
        },
          {
            question: 'Who is the Prime Minister of India ?',
            options :[
              'Rahul Gandhi',
              'Lallu Prasad',
              'Arvind Kejriwal',
              'Narendra Modi'
            ],
            answer: 'Narendra Modi'
          },
          {
            question: 'When is the next cricket 50-50 WC?',
            options :[
              '2019',
              '2020 ',
              '2021',
              '2022'
            ],
            answer:'2019'
          }
        ]
      },{
        testname:'Test 4',
        category:'General knowledge',
        duration:'5',  
        ques:[]=[
            {
              question: 'Which one of these is the national Anthem of India ?',
              options :[
                'Vande Matram',
                'Jai Ho',
                'Jaane Gaane Maane.......',
                'None of the above'
            ],
        answer:'Jaane Gaane Maane.......'
          },
            {
              question: 'Who is the Prime Minister of India ?',
              options :[
                'Rahul Gandhi',
                'Lallu Prasad',
                'Arvind Kejriwal',
                'Narendra Modi'
              ],
              answer: 'Narendra Modi'
            },
            {
              question: 'When is the next cricket 50-50 WC?',
              options :[
                '2019',
                '2020 ',
                '2021',
                '2022'
              ],
              answer:'2019'
            }
          ]
        },{
          testname:'Test 5',
          category:'General knowledge',
          duration:'5',  
          ques:[]=[
              {
                question: 'Which one of these is the national Anthem of India ?',
                options :[
                  'Vande Matram',
                  'Jai Ho',
                  'Jaane Gaane Maane.......',
                  'None of the above'
              ],
          answer:'Jaane Gaane Maane.......'
            },
              {
                question: 'Who is the Prime Minister of India ?',
                options :[
                  'Rahul Gandhi',
                  'Lallu Prasad',
                  'Arvind Kejriwal',
                  'Narendra Modi'
                ],
                answer: 'Narendra Modi'
              },
              {
                question: 'When is the next cricket 50-50 WC?',
                options :[
                  '2019',
                  '2020 ',
                  '2021',
                  '2022'
                ],
                answer:'2019'
              }
            ]
          }
  ]
  constructor(public http: Http) {
    console.log('Hello QuestionsProvider Provider');
  }
  get(i){
      this.index=i;
      this.answers=[];
      this.marks=0;
      this.qIndex=0;
      console.log('get',this.index)
    }
  getQues(){
    
    // this.index=0;
    console.log('get',this.index)    
    let object = this.practisetests[this.index].ques[this.qIndex];
    console.log("@@@@@@@@@@@@@@@@@@@@",object)
    // this.qIndex++;
    return {obj:object,index:this.qIndex};

  }  
   
  setAnswer(answer:any){
    console.log(answer)
    console.log(this.index)
    console.log(this.practisetests[this.index].ques[this.qIndex].answer)
    let aa ={
      q:this.practisetests[this.index].ques[this.qIndex],
      a:answer
    }
    this.answers.push(aa);
      if(this.practisetests[this.index].ques[this.qIndex].answer===answer){
        this.marks+=1;
      }
      this.qIndex++;
  }
  getAnswer(){
    const data ={
      marks:this.marks,
      answers:this.answers,
      length:this.answers.length,
      length1:this.practisetests[this.index].ques.length
    };
    console.log(data);
    return data;
  }

}
