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

  getSummaryById(id: string) {
    return this.http.get(this.URL + id, { headers: this.postHeaders });
  }

  postSummary(payload: any) {
    return this.http.post(this.URL, payload, { headers: this.postHeaders });
  }

  updateSummary(payLoad:any,summaryId:any){
    return this.http.put(this.URL+summaryId,payLoad,{ headers:this.postHeaders } );
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
