import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  MASTER_URL: string = environment.baseUrl + 'master/';
  EVENTS_URL: string = environment.baseUrl + 'event/master/';
  OVERHAUL_URL: string = environment.baseUrl + 'overhaul/master/';
  masters: any[] = [];

  headers = new HttpHeaders({});
  postHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': "'*'",
    "Access-Control-Allow-Headers": "'*'"
  });


  constructor(private http: HttpClient) { }

  getMasters() {
    return this.http.get(this.MASTER_URL, { headers: this.headers });
  }

  getMasterById(id: string) {
    return this.http.get(this.MASTER_URL + id, { headers: this.postHeaders });
  }
  getViewMasterById(id: string) {
    return this.http.get(this.MASTER_URL + id, { headers: this.postHeaders });
  }

  getEventsByMasterId(id: string) {
    return this.http.get(this.EVENTS_URL + id, { headers: this.headers });
  }
  getOverhaulByMasterId(id: string) {
    return this.http.get(this.OVERHAUL_URL + id, { headers: this.headers });
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

  deleteMaster(id: any) {
    this.http
      .delete(this.MASTER_URL + id)
      .subscribe((res) => {
        console.log(res, 'deleted');
      });
  }

}
