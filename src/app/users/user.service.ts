import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../data-models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUsersUrl:string = 'http://127.0.0.1:3000/user';
  getUserByIdUrl:string = 'http://127.0.0.1:3000/user/';
  postUserUrl:string = 'http://127.0.0.1:3000/user';
  updateUserUrl:string = 'http://127.0.0.1:3000/user/';
  deleteUserUrl:string = 'http://127.0.0.1:3000/user/';

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

  getUserById(id:string){
    this.http.get(this.getUserByIdUrl+id)
    .subscribe((res:any)=>{
      console.log(res);
    })
  }

  postUser(user:any){
    this.http.post(this.postUserUrl,
      {userId:user.userId,userName:user.userName,userEmail:user.userEmail,role:user.role,userStatus:user.userStatus},
      {headers:this.headers}).subscribe(
        (res)=>{
          console.log(res);
        }
      )
  }

  updateUser(id:string,user:any){
    this.http.put(this.updateUserUrl+id,
      {userId:user.userId,userName:user.userName,userEmail:user.userEmail,role:user.role,userStatus:user.userStatus},
      {headers:this.headers}).subscribe(
        (res)=>{
          console.log(res);
        }
      )
  }

  deleteUser(id:string)
  {
    this.http.delete(this.deleteUserUrl+id).subscribe(
      (res)=>{
        console.log(res);
      }
    )
  }

}
