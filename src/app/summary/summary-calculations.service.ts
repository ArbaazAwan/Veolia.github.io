import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { MasterService } from '../master/master.service';

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
  private pricesYears = new BehaviorSubject(new Object({}));
  currentPricesYears = this.pricesYears.asObservable();

  private _limit = new BehaviorSubject(new Object({}));
  limit$ = this._limit.asObservable();

  constructor(private masterService: MasterService) { }

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
            // console.log('master', master);

            // console.log('lifeMonths', lifeMonths);
            let lifePerc = summary.life / 100;
            let replacementCostYear = Math.ceil((Number(lifeMonths) * lifePerc) / 12);
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
                  yearsArray[Math.ceil(m / 12)]?.events?.push(i);
                }
              }
            }

            for (let m = 0; m < 600; m++) {
              //adding overhaul cost to the year
              if (m != 0) {
                if (m % overhaulLife == 0) {
                  yearsCosts[Math.ceil(m / 12)] += overhaulCost;
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

              if (limit) {
                if (limit.upperLimit && limit.lowerLimit) {
                  console.log("upper", limit.upperLimit, "lower", limit.lowerLimit)
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
            yearsCosts.forEach((cost: any) => {
              totalCost += cost;
            });
            let averageCost = totalCost / 50;
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
}
