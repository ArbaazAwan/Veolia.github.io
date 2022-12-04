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
  eventsCosts: number[] = [];
  overhaulCost: number = 0;
  yearsArray: any = new Array(50);
  yearsCosts: any = new Array(50);
  yearsCostsViewTable:any = [];
  averagesOfYears:any = [];

  clientContractYears: number = 0;
  clientId: any = localStorage.getItem('clientId');

  constructor(
    private masterService: MasterService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {

    this.initializeValues();

    for (let i = 1; i <= 50; i++) {
      let a = 'Year ' + i.toString();
      this.assetTableHeaders.push(a);
    }

    for (let i = 0; i < 50; i++) {
      let a = '500';
      this.assetTableNumbers.push(a);
    }
    this.getContractYears();

    this.summaryArray.forEach(
      (summary:any)=>{
        this.getMaster(3127); //hardcoded value
      }
    )
    console.log("years costs here",this.yearsCostsViewTable);

  }

  initializeValues(){
    for (let i = 0; i < this.yearsArray.length; i++) {
      let events: number[] = [];
      this.yearsArray[i] = { events };
      this.yearsCosts[i] = 0; //initializing yearly costs with 0
    }
  }

  getMaster(masterId: any) {
    this.masterService
      .getCompleteMasterById(masterId)
      .subscribe((master: any) => {
        let events = master.events;
        let overhaul = master.overhaul;
        let replacementCost = master.master.replacementCost;
        let lifeMonths = master.master.lifeMonths;
        let overhaulLife = Number(master.master.overhaulLife);

        let lifePerc = 100 / 100;
        let replacementCostYear = Math.ceil(
          (Number(lifeMonths) * lifePerc) / 12
        );

        this.calculatingEventsCosts(events);

        this.calculatingOverhaulCosts(overhaul);

        this.eventsOccuredInYears(events);

        this.overhaulCostInYears(overhaulLife);

        this.calculatingYearlyCosts(replacementCostYear,replacementCost);

      });
  }

  calculatingEventsCosts(events:any){
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

      this.eventsCosts.push(totalCostM + totalCostC);
      // console.log("total cost for Event "+(i+1), totalCost + totalCostC);
    }
  }

  calculatingOverhaulCosts(overhaul:any){
    if (overhaul) {
      //calculating overhaul cost
      overhaul.overhaulMaintenance.forEach((ohM: any) => {
        this.overhaulCost += Number(ohM.ohCost);
      });
      overhaul.overhaulContractors.forEach((ohC: any) => {
        this.overhaulCost += Number(ohC.ohHour);
      });
    }
  }

  eventsOccuredInYears(events:any){
    for (let i = 0; i < events.length; i++) {
      //adding occured events in a year to yearsArray
      for (let m = 1; m <= 600; m++) {
        if (m % Number(events[i].evOccurence) === 0) {
          this.yearsArray[m / 12]?.events?.push(i);
        }
      }
    }
  }

  overhaulCostInYears(overhaulLife:any){
    for (let m = 0; m < 600; m++) {
      //adding overhaul cost to the year
      if (m != 0) {
        if (m % overhaulLife == 0) {
          this.yearsCosts[Math.floor(m / 12)] += this.overhaulCost;
          // console.log("overhaul year cost",this.yearsCosts)
        }
      }
    }
  }

  calculatingYearlyCosts(replacementCostYear:any, replacementCost:any){
    for (let y = 1; y < 50; y++) {
      //calculating yearly costs

      this.yearsArray[y].events.forEach((eventIndex: any) => {
        this.yearsCosts[y] += this.eventsCosts[eventIndex];
      });
      if (y % replacementCostYear === 0 || y == 1) {
        this.yearsCosts[y] += Number(replacementCost);
      }
      // console.log('year' + y + ' cost', this.yearsCosts[y]);
    }
    this.yearsCostsViewTable.push(this.yearsCosts);  //adding final costs array into yearsCostsViewTable to display in view table
    this.calculatingAverageYearCosts(this.yearsCosts);
  }

  calculatingAverageYearCosts(yearsCosts:any){
    let totalCost = 0;
    yearsCosts.forEach(
      (cost:any)=>{
        totalCost += cost;
      }
    );
    this.averagesOfYears.push(totalCost);
  }


  getContractYears() {
    this.clientService.getClientById(this.clientId).subscribe((client: any) => {
      this.clientContractYears = client[0].contractYears;
    });
  }
}
