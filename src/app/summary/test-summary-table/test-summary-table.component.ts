import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../summary.service';

@Component({
  selector: 'app-test-summary-table',
  templateUrl: './test-summary-table.component.html',
  styleUrls: ['./test-summary-table.component.scss']
})
export class TestSummaryTableComponent implements OnInit {

  summaryData: any = [];
  siteId: any = localStorage.getItem('siteId');
  clonedSummaries: { [s: string]: any; } = {};

  constructor(private summaryService: SummaryService) { }

  ngOnInit(): void {

    this.summaryService.getSummariesBySiteId(this.siteId).subscribe({
      next: (summaries: any) => {
        this.summaryData = summaries.summary;
      },
      error: (err) => {
        this.summaryService.openSnackBar('no record found in summary table', 'close');
      }
    });
  }

  onRowEditInit(summary: any) {
    this.clonedSummaries[summary.summaryId] = { ...summary };
  }

  onRowEditSave(summary: any) {

    const updateSummaryPayload = {
      siteId: summary.siteId,
      masterId: summary.masterId,
      unit: summary.unit,
      assetType: summary.assetType,
      summarySize: summary.summarySize,
      summaryStatus: true,
      dutyApplication: summary.dutyApplication,
      appDescription: summary.appDescription,
      quality: summary.quality,
      summaryload: summary.summaryload,
      summaryStyle: summary.summaryStyle,
      life: summary.life,
      quantity: summary.quantity,
      installmentDate: summary.installmentDate,
    };

    this.summaryService
      .updateSummary(updateSummaryPayload, summary.summaryId)
      .subscribe({
        next:(_)=>{
          this.summaryService.openSnackBar('Record updated successfully!', 'close');
          delete this.clonedSummaries[summary.summaryId];
        },
        error:(_)=>{
          this.summaryService.openSnackBar('Error occured during update.', 'close')
        }
      });
  }

  onRowDelete(summary:any){
    this.summaryService
      .deleteSummary(summary.summaryId)
      .subscribe({
        next:(_)=>{
          delete this.clonedSummaries[summary.summaryId];
          this.summaryService.openSnackBar('Record deleted successfully!', 'close');
        },
        error:(_)=>{
          this.summaryService.openSnackBar('Error occured during update.', 'close')
        }
      });
  }

  onRowEditCancel(summary: any, index: any) {
    this.summaryData[index] = this.clonedSummaries[summary.summaryId];
    delete this.summaryData[summary.summaryId];
  }


}
