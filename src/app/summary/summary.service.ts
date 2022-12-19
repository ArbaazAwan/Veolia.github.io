import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  constructor(private http: HttpClient) {}

  URL: string = environment.baseUrl + 'summary/';
  SUMMARY_BY_SITE_ID:string = environment.baseUrl + 'summary-site-id/';
  SUMMARY_MASTER_ID:string = environment.baseUrl + 'summary-master-id/';
  UPDATE_SUMMARY_MASTERID:string = environment.baseUrl + 'summary-masterid/';
  URL_MASTER: string = environment.baseUrl + 'master/';

  private summaryId = new BehaviorSubject(null);
  currentSummaryId = this.summaryId.asObservable();

  setSummaryId(id:any){
    this.summaryId.next(id);
  }

  getMaster() {
    return this.http.get(this.URL_MASTER);
  }

  getSummary() {
    return this.http.get(this.URL);
  }

  getSummariesBySiteId(siteId:any){
    return this.http.get(this.SUMMARY_BY_SITE_ID + siteId);
  }

  getSummariesByMasterId(masterId:any){
    return this.http.get(this.SUMMARY_MASTER_ID + masterId);
  }

  getSummaryById(id: string) {
    return this.http.get(this.URL + id);
  }

  postSummary(payload: any) {
    return this.http.post(this.URL, payload);
  }

  updateSummary(payLoad:any,summaryId:any){
    return this.http.put(this.URL+summaryId,payLoad );
  }

  updateSummaryMasterId(oldMasterId:any, newMasterId:any){
    return this.http.put(this.UPDATE_SUMMARY_MASTERID + oldMasterId, { masterId: newMasterId });
  }

  updateClient(_client: any, data: any) {
    return this.http.put(
      this.URL + _client.clientId,
      {
        clientName: data.clientName,
        clientStatus: _client.clientStatus,
        contractYears: data.contractYears,
      }
    );
  }

  deleteSummary(id: any) {
    return this.http.delete(this.URL + id);
  }
}
