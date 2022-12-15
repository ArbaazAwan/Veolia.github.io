import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SiteService {
  sites: any[] = [];
  SITE_URL: string = environment.baseUrl + 'site/';  

  headers = new HttpHeaders({});
  postHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  });

  constructor(private http: HttpClient) {}

  //  getSiteStatus(siteId:any)
  // {
   
  //    let status =  this.getSiteById(siteId).subscribe(
  //     (res:any)=>{
  //       return  res[0].siteStatus;
  //     }
  //    );
  //    return status;
  // }

  getSites() {
    return this.http.get(this.SITE_URL, { headers: this.headers });
  }

  getSiteById(id: any) {
    return this.http.get(this.SITE_URL + id, { headers: this.postHeaders });
  }

  getSiteByClientId(id: string|any) {
    return this.http
      .get(this.SITE_URL + 'client/' + id)
      .pipe(tap((res: any) => {}));
  }

  postSite(siteName: string, selectedClientId: any) {
    return this.http.post(
      this.SITE_URL,
      {
        clientId: selectedClientId,
        siteName: siteName,
      },
      {
        headers: this.postHeaders
      }
    );
  }

  updateSite(siteId: any, data: any) {
    console.log('Site data in service passed in headers',data);
    return this.http.put(
      this.SITE_URL + siteId,
      {
        siteName: data.siteName,
        siteStatus: data.siteStatus
      },
      { headers: this.postHeaders }
    );
  }

  deleteSite(id: any) {
    this.http.delete(this.SITE_URL + id).subscribe((res) => {});
  }
}
