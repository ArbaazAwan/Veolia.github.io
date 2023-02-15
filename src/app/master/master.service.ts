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

  private masterId = new BehaviorSubject(null);
  currentMasterId = this.masterId.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  setMasterId(masterId: any) {
    this.masterId.next(masterId);
  }

  getMasters() {
    return this.http.get(this.MASTER_URL);
  }

  getPendingMasters() {
    return this.http.get(this.BASE_URL + 'pending-masters');
  }

  getMastersBySiteId(id: any) {
    return this.http.get(this.BASE_URL + 'master-site-id/' + id);
  }

  getMastersByAssetId(assetId: any) {
    return this.http.get(this.MASTER_URL + 'asset/' + assetId);
  }

  getCompleteMasterById(id: any) {
    return this.http.get(this.BASE_URL + 'get-complete-master/' + id);
  }

  getMasterById(id: string) {
    return this.http.get(this.MASTER_URL + id);
  }
  getViewMasterById(id: string) {
    return this.http.get(this.MASTER_URL + id);
  }

  getEventsByMasterId(id: string) {
    return this.http.get(this.EVENTS_URL + id);
  }
  getOverhaulByMasterId(id: string) {
    return this.http.get(this.OVERHAUL_URL + id);
  }

  postMaster(master: any) {
    return this.http.post(this.MASTER_URL, master);
  }

  postCompleteMaster(data: any) {
    return this.http.post(this.BASE_URL + 'complete-master', data);
  }

  updateMaster(id: any) {
    return this.http.put(this.MASTER_URL + id, {});
  }

  approveMaster(id: any, approvedBy: any) {
    return this.http.put(this.MASTER_URL + id + '/approve/', { approvedBy: approvedBy });
  }

  rejectMasterById(id: any) {
    return this.http.delete(this.MASTER_URL + id + '/reject/');
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

  openSnackBarWithoutReload(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 3000 });
  }

  updateAssetId(data: any) {
    return this.http.put(this.BASE_URL + 'updateAssetId', data);
  }
}
