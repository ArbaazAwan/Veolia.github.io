import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
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

  @Input() isLoading: boolean = false;
  summaryData: any = [];

  selection = new SelectionModel(true,[]);

  constructor(private summaryService:SummaryService) {}

  ngOnInit(): void {

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

