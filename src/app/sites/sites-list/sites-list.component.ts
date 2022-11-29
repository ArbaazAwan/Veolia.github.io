import { Component, Input, OnInit } from '@angular/core';
import { SiteService } from '../site.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.scss'],
})
export class SitesListComponent implements OnInit {
  @Input() clientId: any;
  constructor(private siteService: SiteService, private router: Router) {}

  sitesList!: any[];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.siteService.getSiteByClientId(this.clientId).subscribe((res: any) => {
      this.isLoading = false;
      this.sitesList = res;
    });
  }

  setclient(event: any) {
    const siteId: string = event.target.id;
    this.siteService.getSiteById(siteId).subscribe((res: any) => {
      localStorage.setItem('clientId', res[0].clientId);
      localStorage.setItem('siteId', event.target.id);
      this.router.navigate(['/dashboard']);
    });
  }
}
