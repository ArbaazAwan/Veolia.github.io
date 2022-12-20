import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  private userId = new BehaviorSubject(null);
  currentUserId = this.userId.asObservable();

  setUserId(userId: any) {
    this.userId.next(userId);
  }

  getUsers() {
    return this.http.get(this.USER_URL);
  }

  getUserById(id: string) {
    return this.http.get(this.USER_URL + id);
  }
  getUserByClientId(id: string) {
    return this.http.get(this.USER_URL + id);
  }
  getClientsByUserId(body: any) {
    return this.http.post(
      this.CLIENTS_BY_USER_ID_URL,
      { userId: body }
    );
  }
  assignClientsByUserId(body: any) {
    return this.http.post(this.ASSIGN_CLIENTS_URL, body);
  }
  getUserByEmail(email: any) {
    return this.http.get(this.USER_URL + 'email/' + email);
  }
  postUser(user: any) {
    return this.http.post(this.CREATE_USER_URL, user);
  }
  updateUser(id: any, data: any) {
    return this.http.put(this.USER_URL + id, data);
  }
  changeUserPassword(data: any) {
    return this.http.put(this.USER_URL + 'password', data);
  }
  deleteUser(id: any, username: string) {
    this.http
      .delete(this.USER_URL + id, {
        body: {
          username,
        },
      })
      .subscribe((res) => {
        console.log(res, 'deleted');
      });
  }
  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, { duration: 3000 });

    snackBarRef.afterDismissed().subscribe(() => {
      // window.location.reload();
    });
  }
}
