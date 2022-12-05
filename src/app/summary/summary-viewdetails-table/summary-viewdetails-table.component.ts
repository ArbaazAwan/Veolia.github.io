import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from 'src/app/clients/client.service';
import { MasterService } from 'src/app/master/master.service';

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

    for (let i = 0; i < 50; i++) {
      let a = '500';
      this.assetTableNumbers.push(a);
    }
    this.getContractYears();
    for (let index = 0; index < 10; index++) {
      this.getMaster(3143);
    }
    console.log(this.yearsCostsViewTable);


    //hardcoded value
  }

  getMaster(masterId: any) {

    var eventsCosts: number[] = [];
    var overhaulCost: number = 0;
    var yearsArray: any = new Array(51);
    var yearsCosts: any = new Array(51);

    for (let i = 0; i < yearsArray.length; i++) {
      let events: number[] = [];
      yearsArray[i] = { events };
      yearsCosts[i] = 0; //initializing yearly costs with 0
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
        let lifePerc = 100 / 100;
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
          for (let m = 1; m <= 600; m++) {
            if (m % Number(events[i].evOccurence) === 0) {
              yearsArray[m / 12]?.events?.push(i);
            }
          }
        }

        for (let m = 0; m < 600; m++) {
          //adding overhaul cost to the year
          if (m != 0) {
            if (m % overhaulLife == 0) {
              yearsCosts[Math.floor(m / 12)] += overhaulCost;
              // console.log("overhaul year cost",yearsCosts)
            }
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
        }
      });
    this.yearsCostsViewTable.push(yearsCosts);
  }

  getContractYears() {
    this.clientService.getClientById(this.clientId).subscribe((client: any) => {
      this.clientContractYears = client[0].contractYears;
    });
  }
}

export class YearEvents {
  events: number[];
}
