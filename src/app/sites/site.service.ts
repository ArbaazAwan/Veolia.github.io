import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  getSitesUrl: string = 'http://127.0.0.1:3000/site';
  getSiteByIdUrl: string = 'http://127.0.0.1:3000/site/';
  postSiteUrl: string = 'http://127.0.0.1:3000/site';
  updateSiteUrl: string = 'http://127.0.0.1:3000/site/';
  deleteSiteUrl: string = 'http://127.0.0.1:3000/site/';

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
       .get(this.getSitesUrl, { headers: this.headers });
   }

   getSiteById(id: string) {
     let site:any;
     this.http.get(this.getSiteByIdUrl + id).subscribe((res: any) => {
       console.log(res);
       site = res;
     });
     return site;
   }

   getSiteByClientId(id: string) {
    return this.http.get(this.getSiteByIdUrl + id).pipe(
      tap((res: any) => {
      console.log(res);
    }));
  }

   postSite(site: any) {
     this.http
       .post(
         this.postSiteUrl,
         {
           clientId: site.clientId,
           siteName: site.siteName,
           siteStatus: site.siteStatus,
         }
       )
       .subscribe((res) => {
         console.log(res);
       });
   }

   updateSite(id: any) {
     let site:any =  this.getSiteById(id);
     this.http
       .put(
         this.updateSiteUrl + id.toString(),
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
     this.http.delete(this.deleteSiteUrl + id).subscribe((res) => {
       console.log(res);
     });
   }
}
