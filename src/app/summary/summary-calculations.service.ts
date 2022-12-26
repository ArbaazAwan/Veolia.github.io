import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { MasterService } from '../master/master.service';
import { formatDate } from '@angular/common';
import { ClientService } from '../clients/client.service';

@Injectable({
  providedIn: 'root',
})
export class SummaryCalculationsService {
  siteId: any = localStorage.getItem('siteId');
  yearsCostsViewTable: any[] = [];
  averagesOfYears: any = [];
  totalYearsCosts: any = [];
  totalAverageYearsCost: number = 0;
  summaryArray: any = [];
  clientId: any;
  private pricesYears = new BehaviorSubject(new Object({}));
  currentPricesYears = this.pricesYears.asObservable();
  clientContractYears: any;

  private _limit = new BehaviorSubject(new Object({}));
  limit$ = this._limit.asObservable();

  constructor(
    private masterService: MasterService,
    private clientService: ClientService
  ) {
    this.getClientContractYears();
  }

  setPricesYears(prices: any, pricesC: any, years: any) {
    this.pricesYears.next({
      prices: prices,
      pricesC: pricesC,
      years: years,
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

    return this.masterService.getCompleteMasterById(masterId).pipe(
      map((master: any) => {
        let events = master.events;
        let overhaul = master.overhaul;
        let replacementCost = master.master.replacementCost;
        let lifeMonths = master.master.lifeMonths;
        let overhaulLife = Number(master.master.overhaulLife);
        let load = 0;

        let lifePerc = summary.life / 100;
        let quantity = summary.quantity;
        if (quantity) {
          quantity = quantity;
        } else {
          quantity = 1;
        }
        let replacementCostYear = Math.ceil(Number(lifeMonths) / 12);

        if (summary.summaryload) {
          load = summary.summaryload / 100;
        } else {
          load = 100 / 100;
        }

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

        // initiating occurence in case of stretch
        var occured = 0;
        for (let i = 0; i < events.length; i++) {
          // fetching stretch from every event
          let stretch = events[i].evStretch;
          // initiating monthIndex to store every month cost
          let monthIndex = 0;
          // loop for months till 50 years
          for (let month = 1; month <= 600; month++) {
            // checking if the stretch is yes
            if (stretch == 'Yes') {
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

        let x = 1;
        var startIndex = 0;
        // checking if the start year is 0 then we will start our startindex from 1 since we do not have values at 0 index
        if (startYear == 0) {
          startIndex = 1;
        } else {
          // else startindex will equal to start year
          startIndex = startYear;
        }

        var ovOccured = 0;

        for (let y = startIndex; y < 50; y++) {
          //calculating yearly costs
          yearsArray[y].events.forEach((eventIndex: any) => {
            yearsCosts[x] += eventsCosts[eventIndex] * Number(quantity);
          });
          // adding replacement cost checking replacement cost year
          if (y % replacementCostYear === 0) {
            yearsCosts[x] += Number(replacementCost) * Number(quantity);
          }
          // adding overhaul life with respect to years
          let ovStretch = master.overhaul.ovStretch;
          if (ovStretch.toLowerCase() == 'yes') {
            ovOccured = Math.ceil(overhaulLife / 12 / load);
          } else {
            ovOccured = Math.ceil(overhaulLife / 12);
          }
          // console.log('ovOccured', ovOccured);
          if (y % ovOccured == 0) {
            yearsCosts[x] += overhaulCost * Number(quantity);
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

        for (let y = 1; y <= 50; y++) {
          //check if the limits are applicable
          if (limit) {
            if (limit.upperLimit && limit.lowerLimit) {
              if (
                yearsCosts[y] > limit.upperLimit ||
                yearsCosts[y] < limit.lowerLimit
              ) {
                yearsCosts[y] = 0;
              }
            } else if (limit.upperLimit) {
              if (yearsCosts[y] > limit.upperLimit) {
                yearsCosts[y] = 0;
              }
            } else if (limit.lowerLimit) {
              if (yearsCosts[y] < limit.lowerLimit) {
                yearsCosts[y] = 0;
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
              life: summary.life,
            };
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
        };
      })
    );
  }

  // function to return occurence
  getOccurence(eventOccurence: any, load: any, month: any) {
    let occured = Math.round((eventOccurence * month) / load);
    return occured;
  }

  getClientContractYears() {
    this.clientId = localStorage.getItem('clientId');
    if (this.clientId) {
      this.clientService.getClientById(this.clientId).subscribe((res: any) => {
        this.clientContractYears = res[0].contractYears;
      });
    }
  }
}
