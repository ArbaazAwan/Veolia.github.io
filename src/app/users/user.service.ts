import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUsersUrl: string = 'http://127.0.0.1:3000/user';
  getUserByIdUrl: string = 'http://127.0.0.1:3000/user/';
  postUserUrl: string = 'http://127.0.0.1:3000/user';
  updateUserUrl: string = 'http://127.0.0.1:3000/user/';
  deleteUserUrl: string = 'http://127.0.0.1:3000/user/';

  users: any[] = [];

  headers = new HttpHeaders({});
  postHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    "Access-Control-Allow-Origin": "'*'",
    "Access-Control-Allow-Headers": "'*'"
  });

  constructor(private http: HttpClient) {
  }

  getUsers() {
   return this.http
      .get(this.getUsersUrl, { headers: this.headers });
  }

  getUserById(id: string) {
    let user:any;
    this.http.get(this.getUserByIdUrl + id).subscribe((res: any) => {
      console.log(res);
      user = res;
    });
    return user;
  }

  postUser(user: any) {
    return this.http
      .post(
        this.postUserUrl,
        {
          userName:user.userName,
          userEmail:user.userEmail,
          role:user.role
        },
        {headers:this.headers}
      );
  }

  updateUser(id: any) {
    let user:any =  this.getUserById(id);
    this.http
      .put(
        this.updateUserUrl + id,
        {
          userName: user.userName,
          userEmail: user.userEmail,
          role: user.role,
          userStatus: user.userStatus,
        },
        { headers: this.headers }
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  deleteUser(id: any) {
    this.http.delete(this.deleteUserUrl + id).subscribe();
  }
}
