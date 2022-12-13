import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SiteService } from 'src/app/sites/site.service';
import { SummaryService } from '../summary.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-summarytable',
  templateUrl: './summarytable.component.html',
  styleUrls: ['./summarytable.component.scss'],
})
export class SummarytableComponent implements OnInit {

  selectedAssets: any[] = [];
  searchText: string = '';
  siteId:any = localStorage.getItem("siteId");
  siteStatus:boolean=false;
  p: number = 1;

  @Input() isLoading: boolean = false;
  summaryData: any = [];

  selection = new SelectionModel(true,[]);

  constructor(private summaryService:SummaryService, private siteService:SiteService) {}

  ngOnInit(): void {
    this.getSiteStatus();
    // this.getSummariesBySiteId(this.siteId);

    this.summaryService.getSummariesBySiteId(this.siteId).subscribe({
        next:(res:any)=>{
          this.summaryData = res.summary;
        },
        error:(err)=>{
          console.log("error occured in getSummary");
        }
      })

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

  getSummariesBySiteId(siteId:any){
    this.summaryService.getSummariesBySiteId(siteId).subscribe({
      next: (summaries)=>{

        console.log("summaries", summaries);

        this.summaryData = summaries;
      },
      error:(_)=>{
        console.log("error occured in getSummariesBySiteId");
      }
    }

    )
  }

  deleteSummary(id: any) {
    this.summaryService.deleteSummary(id).subscribe({
      next:(res)=>{
        window.location.reload();
      },
      error:()=>{
        window.location.reload();
      }
    })
    }

  editSummary(id: any) {
    this.summaryService.setSummaryId(id);
  }
}

