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

  constructor(private http: HttpClient) {}

  getSites() {
    return this.http.get(this.SITE_URL);
  }

  getSiteById(id: any) {
    return this.http.get(this.SITE_URL + id);
  }

  getSiteByClientId(id: string | any) {
    return this.http
      .get(this.SITE_URL + 'client/' + id)
      .pipe(tap((res: any) => {}));
  }

  postSite(siteName: string, selectedClientId: any) {
    return this.http.post(this.SITE_URL, {
      clientId: selectedClientId,
      siteName: siteName,
    });
  }

  updateSite(siteId: any, data: any) {
    return this.http.put(this.SITE_URL + siteId, {
      siteName: data.siteName,
      siteStatus: data.siteStatus,
    });
  }

  deleteSite(id: any) {
    this.http.delete(this.SITE_URL + id).subscribe((res) => {});
  }
}
