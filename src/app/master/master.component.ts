import { Component, OnInit } from '@angular/core';
import { MasterService } from './master.service';
import * as XLSX from 'xlsx';
import { SiteService } from '../sites/site.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  eventEvalTableShow: boolean = false;
  siteId = localStorage.getItem('siteId');
  viewMaster: any;
  excelData: any;
  isLoading:boolean = false;
  siteStatus:boolean=false;
  role: any = localStorage.getItem('role');

  constructor(private masterService:MasterService,  private siteService:SiteService) {}

  ngOnInit(): void {
    this.getSiteStatus();
  }

  getSiteStatus(){
    this.siteService.getSiteById(this.siteId).subscribe({
      next:(site:any)=>{
        this.siteStatus = site[0].siteStatus;
      },
      error:(err)=>{
        console.log("error occured in getSiteStatus", err);
      }
    })
  }

  onViewMaster(masterId:any){
    this.isLoading = true;
    this.masterService.getMasterById(masterId).subscribe((el: any) => {
      this.viewMaster = el[0]
      this.isLoading = false;
    });
  }

}
