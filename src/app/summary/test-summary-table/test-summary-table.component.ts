import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../summary.service';

@Component({
  selector: 'app-test-summary-table',
  templateUrl: './test-summary-table.component.html',
  styleUrls: ['./test-summary-table.component.scss']
})
export class TestSummaryTableComponent implements OnInit {

  summaryData:any = [];
  siteId:any = localStorage.getItem('siteId');

  constructor(private summaryService:SummaryService) { }

  ngOnInit(): void {

    this.summaryService.getSummariesBySiteId(this.siteId).subscribe({
      next:(summaries:any)=>{
        this.summaryData = summaries.summary;
      },
      error:(err)=>{
        console.log("error occured in getSummary");
      }
    });
  }



}
