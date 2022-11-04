import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  USER_URL:string = environment.baseUrl + "user/";
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
      .get(this.USER_URL, { headers: this.headers });
  }

  getUserById(id: string) {
    let user:any;
    this.http.get(this.USER_URL + id).subscribe((res: any) => {
      console.log(res);
      user = res;
    });
    return user;
  }

  postUser(user: any) {
    return this.http
      .post(
        this.USER_URL,
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
        this.USER_URL + id,
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
    this.http.delete(this.USER_URL + id).subscribe();
  }
}
