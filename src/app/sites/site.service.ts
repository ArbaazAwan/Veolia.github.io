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

  getSites() {
    return this.http.get(this.SITE_URL, { headers: this.headers });
  }

  getSiteById(id: string) {
    return this.http.get(this.SITE_URL + id, { headers: this.postHeaders });
  }

  getSiteByClientId(id: string) {
    return this.http.get(this.SITE_URL + 'client/' + id).pipe(
      tap((res: any) => {
        console.log(res);
      })
    );
  }

  postSite(siteName: string, selectedClientId: any) {
    return this.http.post(
      this.SITE_URL,
      {
        clientId: selectedClientId,
        siteName: siteName,
      },
      {
        headers: this.postHeaders,
      }
    );
  }

  updateSite(_site: any, data: any) {
    return this.http.put(
      this.SITE_URL + _site.siteId,
      {
        siteName: data.siteName,
        siteStatus: _site.siteStatus,
      },
      { headers: this.headers }
    );
  }

  deleteSite(id: any) {
    this.http.delete(this.SITE_URL + id).subscribe((res) => {
      console.log(res);
    });
  }
}
