import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from 'src/app/clients/client.service';
import { MasterService } from 'src/app/master/master.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-summary-viewdetails-table',
  templateUrl: './summary-viewdetails-table.component.html',
  styleUrls: ['./summary-viewdetails-table.component.scss'],
})
export class SummaryViewdetailsTableComponent implements OnInit {
  @Input() summaryArray: any;
  assetTableHeaders: string[] = [];
  assetTableNumbers: string[] = [];
  submitted: boolean = false;
  yearsCostsViewTable: any[] = [];
  averagesOfYears: any = [];
  totalYearsCosts: any = [];
  totalAverageYearsCost: number = 0;

  clientContractYears: number = 0;
  clientId: any = localStorage.getItem('clientId');

  constructor(
    private masterService: MasterService,
    private clientService: ClientService
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

    for (let i = 0; i < yearsArray.length; i++) {
      let events: number[] = [];
      yearsArray[i] = { events };
      yearsCosts[i] = 0; //initializing yearly costs with 0
      this.totalYearsCosts[i] = 0;
    }

    this.masterService
      .getCompleteMasterById(masterId)
      .subscribe((master: any) => {
        let events = master.events;
        let overhaul = master.overhaul;
        let replacementCost = master.master.replacementCost;
        let lifeMonths = master.master.lifeMonths;
        let overhaulLife = Number(master.master.overhaulLife);
        // console.log('master', master);

        // console.log('lifeMonths', lifeMonths);
        let lifePerc = summary.life / 100;
        let replacementCostYear = Math.ceil(
          (Number(lifeMonths) * lifePerc) / 12
        );
        // console.log('replacementcostyear', replacementCostYear);

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
          // console.log("total cost for Event "+(i+1), totalCost + totalCostC);
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

        for (let i = 0; i < events.length; i++) {
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
              // console.log('overhaul year cost', yearsCosts);
            }
          }
          i++;
          //  checking if years becomes 50
          if (i == 600) {
            break;
          }
        }

        for (let y = 1; y <= 50; y++) {
          //calculating yearly costs
          yearsArray[y].events.forEach((eventIndex: any) => {
            yearsCosts[y] += eventsCosts[eventIndex];
          });
          if (y % replacementCostYear === 0 || y == 1) {
            yearsCosts[y] += Number(replacementCost);
          }
          //calculating totalYearsCosts
          this.totalYearsCosts[y] += yearsCosts[y];
        }

        //calculating averages
        let totalCost = 0;
        yearsCosts.forEach((cost: any) => {
          totalCost += cost;
        });
        let averageCost = totalCost / 50;
        this.averagesOfYears.push(Math.floor(averageCost));

        this.totalAverageYearsCost += Math.floor(averageCost);
        yearsCosts[0] = summary.unit;

        this.yearsCostsViewTable.push(yearsCosts);
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
  }
}
