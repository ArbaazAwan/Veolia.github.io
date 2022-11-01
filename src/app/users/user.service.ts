import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../data-models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUsersUrl:string = 'http://127.0.0.1:3000/user';
  getUserByIdUrl:string = '';
  postUserUrl:string = '';
  updateUserUrl:string = '';
  deleteUserUrl:string = '';

  users:IUser[]=[];

  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private http:HttpClient) { }

  getUsers()
  {
    this.http.get(this.getUsersUrl,{headers:this.headers})
    .subscribe((res:any)=>{
        console.log(res);
      });
  }

}
