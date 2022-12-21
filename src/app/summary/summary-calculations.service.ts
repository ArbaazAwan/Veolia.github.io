import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { MasterService } from '../master/master.service';
import { formatDate } from '@angular/common';
import { ClientService } from '../clients/client.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryCalculationsService {

  siteId: any = localStorage.getItem("siteId");
  yearsCostsViewTable: any[] = [];
  averagesOfYears: any = [];
  totalYearsCosts: any = [];
  totalAverageYearsCost: number = 0;
  summaryArray: any = [];
  clientId: any;
  private pricesYears = new BehaviorSubject(new Object({}));
  currentPricesYears = this.pricesYears.asObservable();
  clientContractYears:any;

  private _limit = new BehaviorSubject(new Object({}));
  limit$ = this._limit.asObservable();

  constructor(private masterService: MasterService, private clientService: ClientService) {
    this.getClientContractYears();
  }

  setPricesYears(prices: any, pricesC: any, years: any) {
    this.pricesYears.next({
      prices: prices,
      pricesC: pricesC,
      years: years
    });
  }

  setLimit(upperLimit: number, lowerLimit: number) {
    this._limit.next({ upperLimit, lowerLimit });
  }

  performCalculations(masterId: any, summary: any, limit?: any) {

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

    return this.masterService
      .getCompleteMasterById(masterId).pipe(
        map(
          (master: any) => {

            let events = master.events;
            let overhaul = master.overhaul;
            let replacementCost = master.master.replacementCost;
            let lifeMonths = master.master.lifeMonths;
            let overhaulLife = Number(master.master.overhaulLife);

            let lifePerc = summary.life / 100;
            let replacementCostYear = Math.ceil(Number(lifeMonths) / 12);

            let currentYear = Number(new Date().getFullYear());
            let installationYear = Number(
              new Date(
                formatDate(summary.installmentDate, 'yyyy-MM-dd', 'en-US')
              ).getFullYear()
            );
            let cycYear = Number(currentYear - installationYear);

            let startYear = Math.ceil((Number(lifeMonths) * Number(lifePerc)) / 12);

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

            for (let i = 0; i < events.length; i++) {
              //adding occured events in a year to yearsArray
              for (let year = 0; year <= 50; year++) {
                if (year % (Number(events[i].evOccurence) / 12) === 0) {
                  yearsArray[year]?.events?.push(i);
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
                yearsCosts[x] += eventsCosts[eventIndex];
              });
              // adding replacement cost checking replacement cost year
              if (y % replacementCostYear === 0) {
                yearsCosts[x] += Number(replacementCost);
              }
              // adding overhaul life with respect to years
              if (y % (overhaulLife / 12) == 0) {
                yearsCosts[x] += overhaulCost;
              }
              // checking if year is equal to cyclic year plus 1 then we will repeat all the cost again
              if (y == cycYear + 1) y = 1;
              x++;
              // to calculate values till 50 years since our x starts at 1
              if (x == 51) {
                break;
              }
            }

            for (let y = 1; y <= 50; y++) {
              //check if the limits are applicable
              if (limit) {
                if (limit.upperLimit && limit.lowerLimit) {
                  if (yearsCosts[y] > limit.upperLimit || yearsCosts[y] < limit.lowerLimit) {
                    yearsCosts[y] = 0;
                  }
                }
                else if (limit.upperLimit) {
                  if (yearsCosts[y] > limit.upperLimit) {
                    yearsCosts[y] = 0
                  }
                }
                else if (limit.lowerLimit) {
                  if (yearsCosts[y] < limit.lowerLimit) {
                    yearsCosts[y] = 0
                  }
                }
              }
              //calculating totalYearsCosts
              this.totalYearsCosts[y] += yearsCosts[y];
            }

            //calculating averages
            let totalCost = 0;

            for (let i = 0; i < Number(this.clientContractYears); i++) {
              totalCost += yearsCosts[i + 1];
            }
            let averageCost = totalCost / Number(this.clientContractYears);
            yearsCosts[0] = summary.unit;

            return {
              totalYearsCosts: this.totalYearsCosts,
              averageCost: averageCost,
              yearsCosts: yearsCosts,
            }
          }
        )
      )

  }

  getClientContractYears() {
    this.clientId = localStorage.getItem('clientId');
    this.clientService.getClientById(this.clientId).subscribe(
      (res:any)=>{
        this.clientContractYears =  res[0].contractYears;
      }
    )
  }
}


