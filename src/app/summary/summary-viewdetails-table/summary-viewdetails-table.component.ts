import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from 'src/app/clients/client.service';
import { MasterService } from 'src/app/master/master.service';
import * as XLSX from 'xlsx';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-summary-viewdetails-table',
  templateUrl: './summary-viewdetails-table.component.html',
  styleUrls: ['./summary-viewdetails-table.component.scss'],
})
export class SummaryViewdetailsTableComponent implements OnInit {
  @Input() summaryArray: any;
  assetTableHeaders: string[] = [];
  submitted: boolean = false;
  yearsCostsViewTable: any[] = [];
  sortedYearsCostsViewTable: any[] = [];
  averagesOfYears: any = [];
  totalYearsCosts: any = [];
  totalAverageYearsCost: number = 0;
  clientContractYears: number = 0;
  clientId: any = localStorage.getItem('clientId');
  isLoading:boolean = false;

  constructor(
    private masterService: MasterService,
    private clientService: ClientService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    for (let i = 1; i <= 50; i++) {
      let a = 'Year ' + i.toString();
      this.assetTableHeaders.push(a);
    }

    this.getContractYears();
    this.summaryArray.forEach((summary: any) => {
      this.getMaster(summary.masterId, summary);
    });
  }

  getMaster(masterId: any, summary: any) {
    this.isLoading = true;
    var eventsCosts: number[] = [];
    var overhaulCosts: number[] = [];
    var yearsArray: any = new Array(51);
    var ovYearsArray: any = new Array(51);
    var yearsCosts: any = [];
    var summaryData: any = [];

    for (let i = 0; i < yearsArray.length; i++) {
      let events: number[] = [];
      yearsArray[i] = { events };
      yearsCosts[i] = 0; //initializing yearly costs with 0
      this.totalYearsCosts[i] = 0;
    }

    for (let i = 0; i < ovYearsArray.length; i++) {
      let overhaul: number[] = [];
      ovYearsArray[i] = { overhaul };
      yearsCosts[i] = 0; //initializing yearly costs with 0
      this.totalYearsCosts[i] = 0;
    }

    this.masterService
      .getCompleteMasterById(masterId)
      .subscribe({
        next: (master: any) => {
          let events = master.events;
          let overhaul = master.overhaul;
          let replacementCost = master?.master?.replacementCost;
          let lifeMonths = master?.master?.lifeMonths;
          let overhaulLife = Number(master?.master?.overhaulLife);
          let load = 0;
          let lifePerc = summary.life / 100;
          let quantity = summary.quantity;
          if (quantity) {
            quantity = quantity;
          } else {
            quantity = 1;
          }
          let replacementCostYear = Math.round(Number(lifeMonths) / 12);

          if (summary.summaryload) {
            load = summary.summaryload / 100;
          } else {
            load = 100 / 100;
          }

          let startYear = Math.ceil((Number(lifeMonths) * Number(lifePerc)) / 12);
          let startMonth = Number(lifeMonths) * Number(lifePerc);

          for (let i = 0; i < events?.length; i++) {
            //calculating events costs and storing them in array
            let totalCostM: number = 0;
            events[i].eventMaintenance?.forEach((evM: any) => {
              totalCostM += Number(evM.evCost);
            });

            let totalCostC: number = 0;
            events[i].eventContractors?.forEach((evC: any) => {
              totalCostC += Number(evC.evCost);
            });

            eventsCosts.push(totalCostM + totalCostC);
          }

          if (overhaul) {
            //calculating overhaul cost
            let totalCostM: number = 0;
            overhaul.overhaulMaintenance.forEach((ohM: any) => {
              totalCostM += Number(ohM.ohCost);
            });
            let totalCostC: number = 0;
            overhaul.overhaulContractors.forEach((ohC: any) => {
              totalCostC += Number(ohC.ohHour);
            });

            overhaulCosts.push(totalCostM + totalCostC);
          }
          // initiating occurence in case of stretch
          var occured = 0;
          for (let i = 0; i < events?.length; i++) {
            // fetching stretch from every event
            let stretch = events[i].evStretch.toLowerCase();
            // initiating monthIndex to store every month cost
            let monthIndex = 1;
            // loop for months till 50 years
            for (let month = 1; month <= 600; month++) {
              // checking if the stretch is yes
              if (stretch == 'yes') {
                // fetch calculated occured months
                occured = this.getOccurence(events[i].evOccurence, load, month);
                // we only need occurence till the end life of the asset so we are checkin if the occurence is less than equal to life months of asset
                if (occured <= lifeMonths) {
                  // taking ceil to store event cost in that particular year occurence
                  const year = Math.ceil(occured / 12);
                  yearsArray[year]?.events?.push(i);
                }
              } else {
                // checking the occurence with respect to every event
                if (month % events[i].evOccurence == 0) {
                  // taking ceil to store event cost in that particular year occurence
                  const year = Math.ceil(monthIndex / 12);
                  yearsArray[year]?.events?.push(i);
                }
                // checking if the month is equal to life month of asset to reset the months
                if (month == lifeMonths) month = 1;
                // we only need 50 years of forecast when index become 600 break the loop
                monthIndex++;
                if (monthIndex == 600) {
                  break;
                }
              }
            }
          }

          let ovMonthIndex = 1;
          var ovOccured = 0;
          for (let month = 1; month <= 600; month++) {
            let ovStretch = master?.overhaul?.ovStretch;
            if (ovStretch == 'Yes') {
              ovOccured = this.getOccurence(overhaulLife, load, month);
              if (ovOccured <= lifeMonths) {
                const year = Math.ceil(ovOccured / 12);
                ovYearsArray[year]?.overhaul?.push(0);
              }
            } else {
              if (month % overhaulLife == 0) {
                const year = Math.ceil(ovMonthIndex / 12);
                ovYearsArray[year]?.overhaul?.push(0);
              }
              // checking if the month is equal to life month of asset to reset the months
              if (month == lifeMonths) month = 1;
              ovMonthIndex++;
              // we only need 50 years of forecast when index become 600 break the loop
              if (ovMonthIndex == 600) {
                break;
              }
            }
          }

          let x = 1;
          var startIndex = 0;
          // checking if the start year is 0 then we will start our startindex from 1 since we do not have values at 0 index
          if (startYear == 0) {
            startIndex = 1;
          } else {
            // else startindex will equal to start year
            startIndex = startYear;
          }

          for (let y = startIndex; y < 50; y++) {
            //calculating yearly costs
            yearsArray[y].events.forEach((eventIndex: any) => {
              yearsCosts[x] += eventsCosts[eventIndex] * Number(quantity);
            });

            ovYearsArray[y].overhaul.forEach((ovIndex: any) => {
              yearsCosts[x] += overhaulCosts[ovIndex] * Number(quantity);
            });

            // adding replacement cost checking replacement cost year
            if (y % replacementCostYear === 0) {
              yearsCosts[x] += Number(replacementCost) * Number(quantity);
            }

            //calculating totalYearsCosts
            this.totalYearsCosts[x] += yearsCosts[x];
            // checking if year is equal to cyclic year plus 1 then we will repeat all the cost again
            if (y == replacementCostYear) {
              y = 0;
            }
            x++;
            // to calculate values till 50 years since our x starts at 1
            if (x == 51) {
              break;
            }
          }

          //calculating averages
          let totalCost = 0;
          yearsCosts.forEach((cost: any) => {
            totalCost += cost;
          });
          let averageCost = Math.round(totalCost / 50);

          this.totalAverageYearsCost += Math.round(averageCost);

          summaryData[0] = summary.eqpFunctionalDesc;
          summaryData[1] = this.getUnitTemplate(master?.master);
          summaryData[2] = summary.summaryId;
          summaryData[3] = summary.dateCreated;
          summaryData[4] = summary.installmentDate;
          summaryData[5] = summary.life;
          summaryData[6] = summary.summaryload;
          summaryData[7] = averageCost;
          summaryData[8] = yearsCosts;

          this.yearsCostsViewTable.push(summaryData);

          //sort if all the values are received
          if (this.summaryArray.length == this.yearsCostsViewTable.length) {
            this.isLoading = false;
            this.sortAssets({ active: 'summaryId', direction: 'desc' });
          }
        },
        error: (err) => {
          let totalCost = 0;
          yearsCosts.forEach((cost: any) => {
            cost = 0;
          });
          let averageCost = 0;

          this.totalAverageYearsCost =0;

          summaryData[0] = summary.eqpFunctionalDesc;
          summaryData[1] = this.getUnitTemplate();
          summaryData[2] = summary.summaryId;
          summaryData[3] = summary.dateCreated;
          summaryData[4] = summary.installmentDate;
          summaryData[5] = summary.life;
          summaryData[6] = summary.summaryload;
          summaryData[7] = averageCost;
          summaryData[8] = yearsCosts;

          this.yearsCostsViewTable.push(summaryData);

          //sort if all the values are received
          if (this.summaryArray.length == this.yearsCostsViewTable.length) {
            this.isLoading = false;
            this.sortAssets({ active: 'summaryId', direction: 'desc' });
          }
        },
      });
  }

  getUnitTemplate(master?: any) {
    if (
      master?.oldAssetType ||
      master?.newAssetType ||
      master?.masterStyle ||
      master?.masterSize ||
      master?.dutyApplication ||
      master?.quality
    ) {
      return (
        master?.oldAssetType +
        ' - ' +
        master?.newAssetType +
        ', ' +
        master?.masterStyle +
        ', ' +
        master?.masterSize +
        ', ' +
        master?.dutyApplication +
        ', ' +
        master?.quality
      );
    } else {
      return '';
    }
  }

  // function to return occurence
  getOccurence(eventOccurence: any, load: any, month: any) {
    let occured = Math.round((eventOccurence * month) / load);
    return occured;
  }

  sortAssets(sort: any) {
    const data = this.yearsCostsViewTable.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.sortedYearsCostsViewTable = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'summaryId':
          return this.compare(a.at(1), b.at(1), isAsc);
        case 'unit':
          return this.compare(a.at(0), b.at(0), isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean): any {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getContractYears() {
    this.clientService.getClientById(this.clientId).subscribe((client: any) => {
      this.clientContractYears = client[0]?.contractYears;
    });
  }

  exportToExcel(name?: string) {
    let timeSpan = new Date().toISOString();
    let prefix = name || 'ExportResult';
    let fileName = `${prefix}-${timeSpan}`;
    let targetTableElm = document.getElementById('summaryTable');
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{
      sheet: prefix,
    });

    XLSX.writeFile(wb, `${fileName}.xlsx`);
    this.userService.openSnackBar('File is ready to export', 'close');
  }
}
