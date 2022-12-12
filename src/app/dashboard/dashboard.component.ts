import { Component, OnInit } from '@angular/core';
import { ClientService } from '../clients/client.service';
import { SummaryCalculationsService } from '../summary/summary-calculations.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  years: any = [];
  prices: any = [];
  clientId: any;
  clientContractYears: any = 0;
  contigency: number = 0;

  yearsCostsViewTable: any[] = [];
  averagesOfYears: any = [];
  totalYearsCosts: any = [];
  displayTotalYearsCosts:any = [];
  totalAverageYearsCost: number = 0;


  constructor(private clientService: ClientService, private summaryCalculationsService: SummaryCalculationsService) { }

  ngOnInit(): void {
    setTimeout(() => {

      console.log("calculations", this.summaryCalculationsService.values());

      this.assignValues();

      this.onContigencyChange();

    }, 2000);

    this.reloadCheck();
  }

  assignValues() {
    let v = this.summaryCalculationsService.values();
    this.yearsCostsViewTable = v.yearsCostsViewTable;
    this.averagesOfYears = v.averagesOfYears;
    this.totalYearsCosts = v.totalYearsCosts;
    this.totalAverageYearsCost = v.totalAverageYearsCost;

  }

  onContigencyChange() {
    // console.log("value change", this.contigency);
    this.displayTotalYearsCosts = [];

    for (let i = 0; i < this.totalYearsCosts.length; i++) {
      // displaycost = cost + contigency%
      this.displayTotalYearsCosts[i] = this.totalYearsCosts[i] + this.percentage(this.totalYearsCosts[i], this.contigency);
    }
    this.getContractYears();
    console.log("prices", this.prices);
  }

  percentage(num: number, per: number) {
    return (num / 100) * per;
  }

  reloadCheck() {
    if (
      !localStorage.getItem('firstReload') ||
      localStorage.getItem('firstReload') == 'true'
    ) {
      localStorage.setItem('firstReload', 'false');
      window.location.reload();
    } else {
      localStorage.setItem('firstReload', 'true');
    }
    this.clientId = localStorage.getItem('clientId');
  }

  getYearsPrices() {
    for (let i = 1; i <= Number(this.clientContractYears); i++) {
      this.years.push('Year ' + i.toString());
      this.prices[i - 1] = this.displayTotalYearsCosts[i];
    }
  }

  getContractYears() {
    this.clientService.getClientById(this.clientId).subscribe((client: any) => {
      this.clientContractYears = client[0]?.contractYears;
      this.getYearsPrices();
    });
  }
}
