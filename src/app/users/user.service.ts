import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  USER_URL: string = environment.baseUrl + 'user/';
  CREATE_USER_URL: string = environment.baseUrl + 'signup/';
  users: any[] = [];

  headers = new HttpHeaders({});
  postHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Access-Control-Allow-Origin': "'*'",
    // "Access-Control-Allow-Headers": "'*'"
  });

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.USER_URL, { headers: this.headers });
  }

  getUserById(id: string) {
    return this.http.get(this.USER_URL + id, { headers: this.postHeaders });
  }

  postUser(user: any) {
    return this.http.post(this.CREATE_USER_URL, user, {
      headers: this.postHeaders,
    });
  }

  updateUser(id: any, data: any) {
    return this.http.put(this.USER_URL + id, data, {
      headers: this.postHeaders,
    });
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
