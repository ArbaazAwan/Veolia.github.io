import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  MASTER_URL: string = environment.baseUrl + 'master/';
  //CREATE_MASTER_URL: string = environment.baseUrl + 'master/{id}';
  masters: any[] = [];

  headers = new HttpHeaders({});
  postHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Access-Control-Allow-Origin': "'*'",
    // "Access-Control-Allow-Headers": "'*'"
  });


  constructor(private http: HttpClient) { }

  getMasters() {
    return this.http.get(this.MASTER_URL, { headers: this.headers });
  }

  getMasterById(id: string) {
    return this.http.get(this.MASTER_URL + id, { headers: this.postHeaders });
  }

  postMaster(master: any) {
    return this.http.post(this.MASTER_URL, master, {
      headers: this.postHeaders,
    });
  }

  updateMaster(id: any, data: any) {
    return this.http.put(this.MASTER_URL + id, data, {
      headers: this.postHeaders,
    });
  }

  deleteUser(id: any, username: string) {
    this.http
      .delete(this.MASTER_URL + id, {
        body: {
          username
        },
      })
      .subscribe((res) => {
        console.log(res, 'deleted');
      });
  }

}
