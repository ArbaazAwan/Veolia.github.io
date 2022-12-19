import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  BASE_URL: string = environment.baseUrl;
  MASTER_URL: string = this.BASE_URL + 'master/';
  EVENTS_URL: string = this.BASE_URL + 'event/master/';
  OVERHAUL_URL: string = this.BASE_URL + 'overhaul/master/';
  masters: any[] = [];

  headers = new HttpHeaders({});
  postHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': "'*'",
    'Access-Control-Allow-Headers': "'*'",
  });

  private masterId = new BehaviorSubject(null);
  currentMasterId = this.masterId.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  setMasterId(masterId: any) {
    this.masterId.next(masterId);
  }

  getMasters() {
    return this.http.get(this.MASTER_URL, { headers: this.headers });
  }

  getMastersBySiteId(id: any) {
    return this.http.get(this.BASE_URL + 'master-site-id/' + id, {
      headers: this.headers,
    });
  }

  getCompleteMasterById(id: any) {
    return this.http.get(this.BASE_URL + 'get-complete-master/' + id, {
      headers: this.headers,
    });
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

  postCompleteMaster(data: any) {
    return this.http.post(this.BASE_URL + 'complete-master', data, {
      headers: this.postHeaders,
    });
  }

  updateMaster(id: any) {
    return this.http.put(this.MASTER_URL + id, {
      headers: this.postHeaders,
    });
  }

  deleteMaster(id: any) {
    return this.http.delete(this.MASTER_URL + id);
  }

  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, { duration: 3000 });

    snackBarRef.afterDismissed().subscribe(() => {
      window.location.reload();
    });
  }

  updateAssetId(data: any) {
    return this.http.put(this.BASE_URL + 'updateAssetId', data, {
      headers: this.postHeaders,
    });
  }
}
