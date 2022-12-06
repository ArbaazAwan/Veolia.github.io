import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  headers = new HttpHeaders({});
  postHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  private summaryId = new BehaviorSubject(null);
  currentSummaryId = this.summaryId.asObservable();

  setSummaryId(id:any){
    this.summaryId.next(id);
  }

  getMaster() {
    return this.http.get(this.URL_MASTER, { headers: this.headers });
  }

  getSummary() {
    return this.http.get(this.URL, { headers: this.headers });
  }

  getSummariesBySiteId(siteId:any){
    return this.http.get(this.SUMMARY_BY_SITE_ID + siteId, { headers: this.headers } );
  }

  getSummariesByMasterId(masterId:any){
    return this.http.get(this.SUMMARY_MASTER_ID + masterId, { headers: this.headers });
  }

  getSummaryById(id: string) {
    return this.http.get(this.URL + id, { headers: this.postHeaders });
  }

  postSummary(payload: any) {
    return this.http.post(this.URL, payload, { headers: this.postHeaders });
  }

  updateSummary(payLoad:any,summaryId:any){
    return this.http.put(this.URL+summaryId,payLoad,{ headers:this.postHeaders } );
  }

  updateSummaryMasterId(summaryId:any, masterId:any){
    return this.http.put(this.UPDATE_SUMMARY_MASTERID + summaryId, { masterId: masterId });
  }

  updateClient(_client: any, data: any) {
    return this.http.put(
      this.URL + _client.clientId,
      {
        clientName: data.clientName,
        clientStatus: _client.clientStatus,
        contractYears: data.contractYears,
      },
      { headers: this.postHeaders }
    );
  }

  deleteSummary(id: any) {
    return this.http.delete(this.URL + id, { headers: this.headers });
  }
}
