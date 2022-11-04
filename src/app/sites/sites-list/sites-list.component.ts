import { Component, Input, OnInit } from '@angular/core';
import { SiteService } from '../site.service';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.scss']
})
export class SitesListComponent implements OnInit {

  @Input() clientId:any;
  constructor(private siteService:SiteService) { }

  sitesList!:any[];
  isLoading:boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.siteService.getSiteByClientId(this.clientId).subscribe(
      (res:any)=>{
        this.isLoading = false;
        this.sitesList = res;
      }
    )
  }

}
