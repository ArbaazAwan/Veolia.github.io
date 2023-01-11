import { Component, OnInit } from '@angular/core';
import { SummaryCalculationsService } from '../summary/summary-calculations.service';
import * as XLSX from 'xlsx';
import { SummaryService } from '../summary/summary.service';
import { Observable } from 'rxjs';
import { UserService } from '../users/user.service';
import { SiteService } from '../sites/site.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  years: any = [];
  prices: any = [];
  pricesC: any = []; //prices with contigency
  siteId: any;
  siteContractYears: any = 0;
  contigency: number = 0;
  averageYears!: number;
  averageC: number = 0;
  average: number = 0;
  yearsCostsViewTable: any[] = [];
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
  upperLimit: number;
  lowerLimit: number;
  lifeArray: any = [];
  isLoading: boolean = false;

  constructor(
    private siteService: SiteService,
    private summaryCalculationsService: SummaryCalculationsService,
    private summaryService: SummaryService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.reloadCheck();
    this.onLimitChange();
    setTimeout(()=>{
      window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
     }),
     5000
    })
  }

  getCalculationsBySummaries(limit?: any) {
    this.isLoading = true;
    this.yearsCostsViewTable = [];
    this.totalAverageYearsCost = 0;
    this.averagesOfYears = [];
    this.totalYearsCosts = [];
    this.lifeArray = [];
    if (this.siteId) {
      this.summaryService.getSummariesBySiteId(this.siteId).subscribe({
        next: (res: any) => {
          let summaries = res.summary;
          summaries.forEach((summary: any) => {
            let obj: Observable<any> =
              this.summaryCalculationsService.performCalculations(
                summary.masterId,
                summary,
                limit
              );
            obj.subscribe((res: any) => {
              this.averagesOfYears.push(Math.round(res.averageCost));
              this.totalAverageYearsCost += Math.round(res.averageCost);
              this.yearsCostsViewTable.push(res.yearsCosts);
              this.lifeArray.push(res.life);
              this.totalYearsCosts = res.totalYearsCosts;

              this.getSummaryValues();
              this.isLoading = false;
            });
          });
        },
        error: (err) => {
          this.userService.openSnackBar(
            'No record found in Summary. Please insert records in summary to activate the Dashboard.',
            'Close'
          );
        },
      });
    } else {
      this.userService.openSnackBar('Please select Site.', 'Close');
    }
  }

  getSummaryValues() {
    //getting clients contract years
    if (this.siteId) {
      this.siteService
        .getSiteById(this.siteId)
        .subscribe((site: any) => {
          this.siteContractYears = site[0]?.contractYears;
          this.pricesWithoutContigency();
          this.onAverageYearsChange();
          this.onContigencyChange(); //for first the time values
        });
    } else {
      this.userService.openSnackBar('Please select Client and Site.', 'Close');
    }
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
    this.siteId = localStorage.getItem('siteId');
  }

  pricesWithoutContigency() {
    this.prices = [];
    this.years = [];
    for (let i = 1; i <= Number(this.siteContractYears); i++) {
      this.years.push('Year ' + i.toString());
      this.prices[i - 1] = this.totalYearsCosts[i];
    }
    this.summaryCalculationsService.setPricesYears(
      this.prices,
      this.pricesC,
      this.years
    );
    this.maxYearCost = Math.max(...this.prices);
    this.minYearCost = Math.min(...this.prices);
    this.maxYear = this.prices.indexOf(this.maxYearCost) + 1;
    this.minYear = this.prices.indexOf(this.minYearCost) + 1;
  }

  onContigencyChange() {
    this.pricesC = [];
    this.years = [];
    for (let i = 1; i <= Number(this.siteContractYears); i++) {
      this.years.push('Year ' + i.toString());
      // displaycost = cost + contigency%
      this.pricesC[i - 1] = Math.floor(
        this.totalYearsCosts[i] +
          this.percentage(this.totalYearsCosts[i], this.contigency)
      );
    }
    this.summaryCalculationsService.setPricesYears(
      this.prices,
      this.pricesC,
      this.years
    );
    this.maxYearCostC = Math.max(...this.pricesC);
    this.minYearCostC = Math.min(...this.pricesC);
    this.maxYear = this.pricesC.indexOf(this.maxYearCostC) + 1;
    this.minYear = this.pricesC.indexOf(this.minYearCostC) + 1;

    //getting total average cost with contigency
    this.totalAverageYearsCostC = Math.round(
      this.totalAverageYearsCost +
        this.percentage(this.totalAverageYearsCost, this.contigency)
    );

    this.onAverageYearsChange();
  }

  onLimitChange() {
    this.getCalculationsBySummaries({
      upperLimit: this.upperLimit,
      lowerLimit: this.lowerLimit,
    });
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
      vc +=
        this.totalYearsCosts[i + 1] +
        this.percentage(this.totalYearsCosts[i + 1], this.contigency);
      v += this.totalYearsCosts[i + 1];
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
