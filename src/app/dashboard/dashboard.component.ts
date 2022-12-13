import { Component, OnInit } from '@angular/core';
import { ClientService } from '../clients/client.service';
import { SummaryCalculationsService } from '../summary/summary-calculations.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  years: any = [];
  prices: any = [];
  pricesC: any = []; //prices with contigency
  clientId: any;
  clientContractYears: any = 0;
  contigency: number = 0;
  averageYears!: number;
  averageC: number = 0;
  average: number = 0;

  yearsCostsViewTable: any[] = [];
  yearsCostsViewTableC: any[] = [];
  averagesOfYears: any = [];
  totalYearsCosts: any = [];
  displayTotalYearsCosts: any = [];
  totalAverageYearsCost: number = 0;
  totalAverageYearsCostC: number = 0;
  maxYearCostC: number = 0;
  minYearCostC: number = 0;
  maxYearCost: number = 0;
  minYearCost: number = 0;
  maxYear: string = '';
  minYear: string = '';


  constructor(private clientService: ClientService, private summaryCalculationsService: SummaryCalculationsService) { }

  ngOnInit(): void {
    setTimeout(() => {

      this.assignValues();

      //getting clients contract years
      this.clientService.getClientById(this.clientId).subscribe((client: any) => {
        this.clientContractYears = client[0]?.contractYears;
        this.pricesWithoutContigency();
        this.onContigencyChange(); //for first the time values
      });

    }, 2000);

    this.reloadCheck();
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

  assignValues() {
    let v = this.summaryCalculationsService.values();
    this.yearsCostsViewTable = v.yearsCostsViewTable;
    this.averagesOfYears = v.averagesOfYears;
    this.totalYearsCosts = v.totalYearsCosts;
    this.totalAverageYearsCost = v.totalAverageYearsCost;
  }

  pricesWithoutContigency() {
    this.prices = [];
    this.years = [];
    for (let i = 1; i <= Number(this.clientContractYears); i++) {
      this.years.push('Year ' + i.toString());
      this.prices[i - 1] = this.totalYearsCosts[i];
    }
    this.summaryCalculationsService.setPricesYears(this.prices, this.pricesC, this.years);
    this.maxYearCost = Math.max(...this.prices);
    this.minYearCost = Math.min(...this.prices);
    this.maxYear = this.prices.indexOf(this.maxYearCost) + 1;
    this.minYear = this.prices.indexOf(this.minYearCost) + 1;
  }

  onContigencyChange() {
    this.pricesC = [];
    this.years = [];
    for (let i = 1; i <= Number(this.clientContractYears); i++) {
      this.years.push('Year ' + i.toString());
      // displaycost = cost + contigency%
      this.pricesC[i - 1] = this.totalYearsCosts[i] + this.percentage(this.totalYearsCosts[i], this.contigency);
    }
    this.summaryCalculationsService.setPricesYears(this.prices,this.pricesC, this.years);
    this.maxYearCostC = Math.max(...this.pricesC);
    this.minYearCostC = Math.min(...this.pricesC);
    this.maxYear = this.pricesC.indexOf(this.maxYearCostC) + 1;
    this.minYear = this.pricesC.indexOf(this.minYearCostC) + 1;

    //getting total average cost with contigency
    this.totalAverageYearsCostC = Math.floor(this.totalAverageYearsCost + this.percentage(this.totalAverageYearsCost,this.contigency));

    // yearsCostsViewTableC to display totals with contigency
    for(let i = 0; i< this.yearsCostsViewTable.length; i++){
     this.yearsCostsViewTableC[i] = this.yearsCostsViewTable[i]?.at(0) + this.percentage(this.yearsCostsViewTable[i]?.at(0),this.contigency);
    }

    this.onAverageYearsChange();
  }

  percentage(num: number, per: number) {
    return (num / 100) * per;
  }

  onAverageYearsChange() {
    this.averageC = 0;
    this.average = 0;
    let vc = 0;
    let v = 0;
    for (let i = 0; i < this.averageYears; i++) {
      vc += this.totalYearsCosts[i+1] + this.percentage(this.totalYearsCosts[i+1], this.contigency);
      v += this.totalYearsCosts[i+1];
    }
    this.averageC = Math.floor(vc / this.averageYears);
    this.average = Math.floor(v / this.averageYears);
  }

  exportToExcel(name?: string) {
    let timeSpan = new Date().toISOString();
    let prefix = name || 'ExportResult';
    let fileName = `${prefix}-${timeSpan}`;
    let targetTableElm = document.getElementById('dashboard-details-table');
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{
      sheet: prefix,
    });

    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

}
