import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-viewdetails-table',
  templateUrl: './summary-viewdetails-table.component.html',
  styleUrls: ['./summary-viewdetails-table.component.scss']
})
export class SummaryViewdetailsTableComponent implements OnInit {

  constructor() { }
  assetTableHeaders:string[]=[];
  assetTableNumbers:string[]=[];
  submitted:boolean = false;


  ngOnInit(): void {
    for(let i=1;i<=50;i++)
    {
      let a = "Year "+ i.toString();
      this.assetTableHeaders.push(a);
    }

    for(let i=1;i<=51;i++)
    {
      let a = "500";
      this.assetTableNumbers.push(a);
    }

  }

}
