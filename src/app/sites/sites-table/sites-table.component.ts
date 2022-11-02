import { Component, Input, OnInit } from '@angular/core';
import { SiteService } from '../site.service';

@Component({
  selector: 'app-sites-table',
  templateUrl: './sites-table.component.html',
  styleUrls: ['./sites-table.component.scss']
})
export class SitesTableComponent implements OnInit {

  constructor(private siteService:SiteService) { }

  searchText:string = '';
  isLoading:boolean = false;

  sites:any[] =[];

  ngOnInit(): void {
    this.isLoading = true;
    this.siteService.getSites().subscribe(
      (res:any)=>{
        this.sites= res;
        this.isLoading = false;
      }
    )
  }
  updateSite(id:any){
    this.siteService.updateSite(id);
  }
  deleteSite(id:any){
    this.siteService.deleteSite(id);
  }

}
