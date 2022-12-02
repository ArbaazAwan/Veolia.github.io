import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from 'src/app/clients/client.service';
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
  totalEventsCosts: number = 0;
  yearlyCosts:number[] =[];
  clientContractYears:number =0;
  clientId:any = localStorage.getItem('clientId');

  constructor(private masterService:MasterService, private clientService:ClientService) {}

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

    this.getMaster(3127); //hardcoded value

  }

  getMaster(masterId:any){
    this.masterService.getCompleteMasterById(masterId).subscribe(
      (master:any)=>{
        // console.log("master:",master);

        let events = master.events;
        var occuredArray:any =[];

        for (let i = 0; i < events?.length; i++) {
          let totalCostM: number = 0;
          events[i].eventMaintenance?.forEach((evM: any) => {
            totalCostM += Number(evM.evCost);
          });

          let totalCostC: number = 0;
          events[i].eventContractors?.forEach((evC: any) => {
            totalCostC += Number(evC.evCost);
          });
          let occured = 12/(Number(events[i].evOccurence))
          occuredArray.push(occured);
          console.log("occured:",occured);


          this.totalEventsCosts += totalCostM + totalCostC;

          // console.log("total cost for Event "+(i+1), totalCost + totalCostC);
        }

        for(let i = 1; i<=50; i++){   // hardcoded 50 years

          let yearCost = 0;

          if(i == 1)
          {
            yearCost = Math.round(this.totalEventsCosts + Number(master.master.replacementCost)); // (lifemos/12, 0) then ReplCost+Yearcost but we are considering year 1
          }
          else{
            yearCost = Math.round(this.totalEventsCosts);
          }
          for(let ie = 0; ie<occuredArray.length; ie++){

            if(occuredArray[ie] != 0){
              yearCost = yearCost * occuredArray[ie];
            }
            occuredArray[ie] += occuredArray[ie];        //occured = occured + occured
          }

          this.yearlyCosts.push(yearCost);
          console.log("Year "+i, yearCost);
        }


      }
    )
  }

  getContractYears(){
    this.clientService.getClientById(this.clientId).subscribe(
      (client:any)=>{
        this.clientContractYears = client[0].contractYears;
      }
    )
  }






}
