import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SiteService } from '../site.service';

@Component({
  selector: 'app-sites-table',
  templateUrl: './sites-table.component.html',
  styleUrls: ['./sites-table.component.scss'],
})
export class SitesTableComponent implements OnInit {
  constructor(private siteService: SiteService) {}
  p: number = 1;
  searchText: string = '';
  sortedSites: any = [];
  contractYearA: number;
  contractYearB: number;

  @Input() isLoading: boolean = false;
  @Input() sites: any[] = [];

  @Output() deleteSiteEvent = new EventEmitter();
  @Output() editSiteEvent = new EventEmitter();

  ngOnChanges() {
    this.sortAssets({ active: 'siteName', direction: 'asc' });
  }

  ngOnInit(): void {
    this.sortAssets({ active: 'siteName', direction: 'asc' });
  }

  editSite(id: any) {
    this.editSiteEvent.emit(id);
  }

  deleteSite(id: any) {
    this.deleteSiteEvent.emit(id);
  }

  sortAssets(sort: any) {
    const data = this.sites.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.sortedSites = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'siteId':
          return this.compare(a.siteId, b.siteId, isAsc);
        case 'siteName':
          return this.compare(
            a.siteName?.toLowerCase(),
            b.siteName?.toLowerCase(),
            isAsc
          );
        case 'contractYears':
          this.contractYearA = Number(a.contractYears);
          this.contractYearB = Number(b.contractYears);
          return this.compare(this.contractYearA, this.contractYearB, isAsc);
        case 'clientName':
          return this.compare(
            a.clientName?.toLowerCase(),
            b.clientName?.toLowerCase(),
            isAsc
          );
        case 'siteStatus':
          return this.compare(a.siteStatus, b.siteStatus, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean): any {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
