import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from 'src/app/clients/client.service';
import { MasterService } from 'src/app/master/master.service';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';
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
  averagesOfYears: any = [];
  totalYearsCosts: any = [];
  totalAverageYearsCost: number = 0;

  clientContractYears: number = 0;
  clientId: any = localStorage.getItem('clientId');

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
    var eventsCosts: number[] = [];
    var overhaulCost: number = 0;
    var yearsArray: any = new Array(51);
    var yearsCosts: any = [];
    var summaryData: any = [];

    for (let i = 0; i < yearsArray.length; i++) {
      let events: number[] = [];
      yearsArray[i] = { events };
      yearsCosts[i] = 0; //initializing yearly costs with 0
      this.totalYearsCosts[i] = 0;
    }

    this.masterService
      .getCompleteMasterById(masterId)
      .subscribe((master: any) => {
        let events = master?.events;
        let overhaul = master.overhaul;
        let replacementCost = master.master.replacementCost;
        let lifeMonths = master.master.lifeMonths;
        let overhaulLife = Number(master.master.overhaulLife);

        let lifePerc = summary.life / 100;
        let replacementCostYear = Math.floor(Number(lifeMonths) / 12);

        let currentYear = Number(new Date().getFullYear());
        let installationYear = Number(
          new Date(
            formatDate(summary.installmentDate, 'yyyy-MM-dd', 'en-US')
          ).getFullYear()
        );
        let cycYear = Number(currentYear - installationYear);

        let startYear = Math.ceil((Number(lifeMonths) * Number(lifePerc)) / 12);
        // console.log(startYear);

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
          overhaul.overhaulMaintenance.forEach((ohM: any) => {
            overhaulCost += Number(ohM.ohCost);
          });
          overhaul.overhaulContractors.forEach((ohC: any) => {
            overhaulCost += Number(ohC.ohHour);
          });
        }

        for (let i = 0; i < events?.length; i++) {
          //adding occured events in a year to yearsArray
          // checking if life months equals to months so that we can start counting again
          let j = 0;
          for (let m = 0; m < 600; m++) {
            if (m % Number(events[i].evOccurence) === 0) {
              yearsArray[Math.ceil(j / 12)]?.events?.push(i);
            }
            if (m == lifeMonths) m = 0;
            j++;
            //  checking if years becomes 50
            if (j == 600) {
              break;
            }
          }
        }
        let i = 0;
        for (let m = 0; m < 600; m++) {
          //adding overhaul cost to the year
          // checking if life months equals to months so that we can start counting again
          if (m == lifeMonths) m = 0;
          if (m != 0) {
            if (m % overhaulLife == 0) {
              yearsCosts[Math.ceil(i / 12)] += overhaulCost;
            }
          }
          i++;
          //  checking if years becomes 50
          if (i == 600) {
            break;
          }
        }

        let x = 1;
        for (let y = startYear; y <= 50; y++) {

          //calculating yearly costs
          yearsArray[y].events.forEach((eventIndex: any) => {
            yearsCosts[x] += eventsCosts[eventIndex];
          });
          if (y % replacementCostYear === 0) {
            yearsCosts[x] += Number(replacementCost);
          }
          //calculating totalYearsCosts
          this.totalYearsCosts[x] += yearsCosts[x];
          if (Math.ceil(lifeMonths / 12) == y) y = 0;
          x++;
          if (x == 51) {
            break;
          }
        }

        //calculating averages
        let totalCost = 0;
        yearsCosts.forEach((cost: any) => {
          totalCost += cost;
        });
        let averageCost = totalCost / 50;
        this.averagesOfYears.push(Math.floor(averageCost));

        this.totalAverageYearsCost += Math.floor(averageCost);

        summaryData[0] = summary.unit;
        summaryData[1] = summary.summaryId;
        summaryData[2] = summary.dateCreated;
        summaryData[3] = summary.installmentDate;
        summaryData[4] = summary.life;
        summaryData[5] = yearsCosts;

        this.yearsCostsViewTable.push(summaryData);
      });
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
