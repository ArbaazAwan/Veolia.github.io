import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SiteService } from '../site.service';

@Component({
  selector: 'app-sites-table',
  templateUrl: './sites-table.component.html',
  styleUrls: ['./sites-table.component.scss'],
})
export class SitesTableComponent implements OnInit {
  constructor(private siteService: SiteService) {}

  searchText: string = '';
  @Input() isLoading: boolean = false;
  @Input() sites: any[] = [];

  @Output() deleteSiteEvent = new EventEmitter();
  @Output() editSiteEvent = new EventEmitter();

  ngOnInit(): void {}

  editSite(id: any) {
    this.editSiteEvent.emit(id);
  }

  deleteSite(id: any) {
    this.deleteSiteEvent.emit(id);
  }
}
