import { query } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ClientService } from '../clients/client.service';
import { SiteService } from '../sites/site.service';
import { SummaryService } from './summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  
  form!: FormGroup;
  isLoading: boolean = false;
  summaryData: any[] = [];
  error: any = {};
  isEditFormLoading: boolean = true;
  isMasterLoading: boolean = true;
  siteStatus:boolean=false;
  siteId = localStorage.getItem('siteId');
  clientId=localStorage.getItem('clientId');
  clientStatus:boolean=false;

  summarySelect = {
    assetTypes: [],
    sizes: [],
    discription: [],
    qualities: [],
  };

  constructor(
    private summaryService: SummaryService, private siteService:SiteService, private clientService:ClientService
  ) {}

  ngOnInit(): void {
    this.getSiteStatus();
    this.getSummary();
    this.getClientStatus();
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

  getClientStatus(){
    this.clientService.getClientById(this.clientId).subscribe({
      next:(client:any)=>{
        this.clientStatus = client[0].clientStatus;
      },
      error:(err)=>{
        console.log("error occured in getclientStatus", err);
      }
    })
  }

  getSummary() {
    this.isLoading = true;
    this.summaryService.getSummary().subscribe((res: any) => {
      this.summaryData = res;
      this.isLoading = false;
    });
  }

}
