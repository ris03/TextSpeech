import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Http,Headers,Response } from '@angular/http';
import { AuthProvider } from '../auth/auth';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

/*
  Generated class for the TestsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TestsProvider implements OnInit {

  token;
    user;
    testIds: any[] = [];
    completedTest: any[] = [];
    assignedTests: any[] = [];
    questions:any[]=[];
    index=0;
    marks=0;
    answers:any[]=[];
    apiUrl: string = 'https://cfe-candidate.herokuapp.com';

    constructor(private http: Http,private userService: AuthProvider
    ) {
        
    }
    ngOnInit(){
      
        
    }
    // ionViewWillEnter(){
    //   this.user = JSON.parse(window.localStorage.getItem('user'));
    //     this.token = window.localStorage.getItem('token');
    //   // this.user = this.userService.user;
    //     // this.token = this.userService.authToken;
    //     console.log(this.user,this.token) 
    // }

    _errorHandler(error: any, reject) {
        if (error.status == 0) {
            // reject('Server Not responding!');
            return Observable.throw({ _body: JSON.stringify({ msg: 'Server Not responding!!' }) });
        } else if (error.status > 400 && error.status < 500) {
            // reject('Something went wrong!')
            return Observable.throw(error || { _body: JSON.stringify({ msg: '' }) });
        }
        // reject('Server Error');
        return Observable.throw(error || 'Server Error!!');

    }
    //================================
    //          GETTINGG ALL TESTS FROM API
    //================================
    getAllTests() {
      this.user = window.localStorage.getItem('user');
        this.token = window.localStorage.getItem('token');
        
      // this.user = this.userService.user;
      // this.token = this.userService.authToken;
        let headers = new Headers();
        let id = this.user;

        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + this.token);
        headers.append('id', id);

        return new Promise((resolve, reject) => {
            this.http.get(this.apiUrl + '/tests/getassignedtests', { headers: headers })
                .catch((err) => {
                    return this._errorHandler(err, reject);
                })
                .subscribe(

                    (res: Response) => {
                        let data = res.json();
                        this.assignedTests = data;
                        this.testIds = data.map(test => test._id);
                    },
                    (err) => {
                        reject(err);
                    },
                    () => {

                        this.getStateofTest()
                            .catch((err) => {
                                return this._errorHandler(err, reject);
                            })
                            .subscribe((response: any) => {
                                this.completedTest = response;
                                for (let i = 0; i < this.assignedTests.length; i++) {
                                    for (let k = 0; k < this.completedTest.length; k++) {
                                        if (this.assignedTests[i]._id === this.completedTest[k].testId) {
                                            this.completedTest[k].category = this.assignedTests[i].category;
                                            this.completedTest[k].difficultylevel = this.assignedTests[i].difficultylevel;
                                            this.completedTest[k].testName = this.assignedTests[i].testName;
                                            this.assignedTests.splice(i, 1);
                                            i--;
                                            break;

                                        }
                                    }
                                }

                                resolve({ assignedTest: this.assignedTests, completedTest: this.completedTest });
                            })

                    });



        });

    }
    //================================================
    //              GETTING ALL QUESTIONS
    //================================================
    getAllQuestions(qusIds: any[]) {
      this.index=0;
      this.marks=0;
      this.answers=[];
      this.questions=[];
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + this.token);
        return this.http
            .put(this.apiUrl + '/tests/getQuestions', qusIds, { headers: headers })
            .map((res: Response) => {
              console.log(res.json());
              console.log(res);
              res.json().forEach(ques => {
                this.questions.push(ques)
              });
                // this.questions=res.json());
                console.log(this.questions);
                return res.json();
            })
            .catch(this._errorHandler);
    }

    //================================ ============================
    //    GETTING STATES OF TESTS
    //=============================================================
    getStateofTest() {
        let userid = JSON.parse(this.user).email;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + this.token);
        return this.http.put(this.apiUrl + '/response/state/' + userid, { tids: this.testIds, practice: false }, { headers: headers })
            .map((response: Response) => {
                return response.json().test;
            })
            .catch(this._errorHandler);
    }
    getQues(){
        let qq = this.questions[this.index];
        return {qustion:[qq],index:this.index};
      }
    setAnswer(answer:any){
        console.log('my answer',answer);
        console.log('asli answer',this.questions[this.index].answer)
        console.log('sent answer'+answer);  
        this.answers.push(answer);
        console.log('array'+this.answers)
        if(this.questions[this.index].answer===answer){
          this.marks+=1;
          console.log(this.marks)
        }
        this.index++;
    }
    getAnswer()
    {
      const data ={
        marks:this.marks,
        answers:this.answers,
        length:this.answers.length,
        length1:this.questions.length
      };
      return data;
    }

}
