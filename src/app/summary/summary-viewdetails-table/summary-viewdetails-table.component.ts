import { Component, OnInit, Input } from '@angular/core';
import { MasterService } from 'src/app/master/master.service';

@Component({
  selector: 'app-summary-viewdetails-table',
  templateUrl: './summary-viewdetails-table.component.html',
  styleUrls: ['./summary-viewdetails-table.component.scss'],
})
export class SummaryViewdetailsTableComponent implements OnInit {
  @Input() summaryArray:any;
  assetTableHeaders: string[] = [];
  assetTableNumbers: string[] = [];
  submitted: boolean = false;

  constructor(private masterService:MasterService) {}

  ngOnInit(): void {
    for (let i = 1; i <= 50; i++) {
      let a = 'Year ' + i.toString();
      this.assetTableHeaders.push(a);
    }

    for (let i = 1; i <= 51; i++) {
      let a = '500';
      this.assetTableNumbers.push(a);
    }
  }

  




}
