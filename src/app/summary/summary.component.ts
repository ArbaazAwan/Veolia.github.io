import { query } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  summarySelect = {
    assetTypes: [],
    sizes: [],
    discription: [],
    qualities: [],
  };

  constructor(
    private summaryService: SummaryService, private siteService:SiteService
  ) {}

  ngOnInit(): void {
    this.getSiteStatus();
    this.getSummary();
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

  getSummary() {
    this.isLoading = true;
    this.summaryService.getSummary().subscribe((res: any) => {
      this.summaryData = res;
      this.isLoading = false;
    });
  }

}
