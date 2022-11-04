import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SiteService {

  sites: any[] = [];

  headers = new HttpHeaders({});
  postHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*"
  });

  constructor(private http: HttpClient) { }

  getSites() {
    return this.http
      .get(environment.getSitesUrl, { headers: this.headers });
  }

  getSiteById(id: string) {
    let site: any;
    this.http.get(environment.getSiteByIdUrl + id).subscribe((res: any) => {
      console.log(res);
      site = res;
    });
    return site;
  }

  getSiteByClientId(id: string) {
    return this.http.get(environment.getSiteByIdUrl + id).pipe(
      tap((res: any) => {
        console.log(res);
      }));
  }

  postSite(siteName: string, selectedClientId: any) {
    return this.http
      .post(
        environment.postSiteUrl,
        {
          clientId: selectedClientId,
          siteName: siteName,
        },
        {
          headers:this.postHeaders
        }
        );
  }

  updateSite(id: any) {
    let site: any = this.getSiteById(id);
    this.http
      .put(
        environment.updateSiteUrl + id.toString(),
        {
          siteName: site.siteName,
          siteStatus: site.siteStatus,
        },
        { headers: this.headers }
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  deleteSite(id: any) {
    this.http.delete(environment.deleteSiteUrl + id).subscribe((res) => {
      console.log(res);
    });
  }
}
