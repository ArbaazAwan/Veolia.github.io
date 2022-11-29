import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  USER_URL: string = environment.baseUrl + 'user/';
  CLIENTS_BY_USER_ID_URL: string = environment.baseUrl + 'getclientsbyuserid/';
  ASSIGN_CLIENTS_URL: string = environment.baseUrl + 'assignClients/';
  CREATE_USER_URL: string = environment.baseUrl + 'signup/';
  users: any[] = [];

  headers = new HttpHeaders({});
  postHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': "'*'"
    // "Access-Control-Allow-Headers": "'*'"
  });

  constructor(private http: HttpClient) {}
  private userId = new BehaviorSubject (null);
  currentUserId = this.userId.asObservable();

  setUserId(userId:any){
    this.userId.next(userId)
  }

  getUsers() {
    return this.http.get(this.USER_URL, { headers: this.headers });
  }

  getUserById(id: string) {
    return this.http.get(this.USER_URL + id, { headers: this.postHeaders });
  }
  getUserByClientId(id: string) {
    return this.http.get(this.USER_URL + id, { headers: this.postHeaders });
  }
  getClientsByUserId(body: any) {
    return this.http.post(this.CLIENTS_BY_USER_ID_URL, {"userId":body}, { headers: this.postHeaders });
  }
  assignClientsByUserId(body: any) {
    return this.http.post(this.ASSIGN_CLIENTS_URL, body, { headers: this.postHeaders });
  }
  getUserByEmail(email:any) {
    return this.http.get(this.USER_URL + "email/"+ email, { headers: this.headers });
  }
  postUser(user: any) {
    return this.http.post(this.CREATE_USER_URL, user, {
      headers: this.postHeaders,
    });
  }
  updateUser(id: any, data: any) {
    console.log("UpdateUser:" ,data);
    return this.http.put(this.USER_URL + id, data, {
      headers: this.postHeaders,
    });
  }
  changeUserPassword(data:any){
    return this.http.put(this.USER_URL + "password",data,{headers:this.postHeaders});
  }
  deleteUser(id: any, username: string) {
    this.http
      .delete(this.USER_URL + id, {
        body: {
          username
        },
      })
      .subscribe((res) => {
        console.log(res, 'deleted');
      });
  }
}
