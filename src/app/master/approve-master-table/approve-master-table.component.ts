import { Component, OnInit } from '@angular/core';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-approve-master-table',
  templateUrl: './approve-master-table.component.html',
  styleUrls: ['./approve-master-table.component.scss']
})
export class ApproveMasterTableComponent implements OnInit {

  isLoading: boolean = false;
  masters: any = [];
  sortedMasters: any = [];
  assetSearchText: string = '';
  // maxEvents: number = 0;
  // maxEventMaintenance: number = 0;
  // maxEventLabours: number = 0;
  // maxEventContractors: number = 0;
  // cols: any = [];
  displayedColumns: string[] = [];
  dataSource:any = [];
  previousRow:any = {};

  constructor(private masterService: MasterService) { }

  ngOnInit(): void {
    this.getPendingMasters();
  }

  transformObjectToArray(obj: object) {
    const keys = Object.keys(obj);

    for (const key of keys) {
      if (this.displayedColumns.includes(key)) {
        continue;
      }
      this.displayedColumns.push(key);
    }
  }

  transformRows(){
    this.masters?.forEach(
      (master:any)=>{
        let masterKeys = Object.keys(master);

        for (const key of this.displayedColumns){
          if(masterKeys.includes(key)){
            continue;
          }
          master[key as keyof Object] = null;
        }
    });
  }

  isDifferent(currentRow:any, col:any){
    if(currentRow[col] != this.previousRow[col]){
      this.previousRow = currentRow;
      return true;
    }
    this.previousRow = currentRow;
    return false;
  }

  getPendingMasters() {
    this.isLoading = true;
    this.masterService.getPendingMasters().subscribe(
      {
        next: (res: any) => {
          let masters = res.masters;
          let mi = 0;
          masters.forEach((master: any) => {
            this.masterService.getCompleteMasterById(master.masterId).subscribe({
              next: (master: any) => {

                var completeMaster:any = {};

                let cMaster = master.master;
                let overhaul = master?.overhaul;


                //adding master into completeMaster object
                completeMaster['Id' as keyof Object] = cMaster.masterId;
                completeMaster['Unit Description' as keyof Object] = cMaster.unitDesc;
                completeMaster['Asset Type' as keyof Object] = cMaster.oldAssetType;
                completeMaster['New Asset Type' as keyof Object] = cMaster.newAssetType;
                completeMaster['App Description' as keyof Object] = cMaster.oldDescription;
                completeMaster['New Asset Type Unit Description' as keyof Object] = cMaster.newDescription;
                completeMaster['Style' as keyof Object] = cMaster.masterStyle;
                completeMaster['Size' as keyof Object] = cMaster.masterSize;
                completeMaster['Duty / Application' as keyof Object] = cMaster.dutyApplication;
                completeMaster['Quality' as keyof Object] = cMaster.quality;
                completeMaster['Unit Measurement' as keyof Object] = cMaster.unitMeasurement;
                completeMaster['Replacement Cost' as keyof Object] = cMaster.replacementCost;
                completeMaster['Life Months' as keyof Object] = cMaster.lifeMonths;
                completeMaster['Overhaul Life' as keyof Object] = cMaster.overhaulLife;
                completeMaster['Rev' as keyof Object] = cMaster.rev;

                //adding overhaul into completeMaster object
                completeMaster['OH Title' as keyof Object] = overhaul.ovTitle;
                completeMaster['OH Stretch' as keyof Object] = overhaul.ovStretch;

                for(let m = 0; m < overhaul?.overhaulMaintenance?.length; m++){
                  let maintenances = overhaul?.overhaulMaintenance;

                    completeMaster['OH' + 'M' + (m + 1) as keyof Object] = maintenances[m].ohMaintenance;
                    completeMaster['OH' + 'M' + (m + 1) + 'Cst' as keyof Object] = maintenances[m].ohCost;
                }

                for(let l = 0; l < overhaul?.overhaulLabours?.length; l++){
                  let labours = overhaul.overhaulLabours;

                    completeMaster['OH' + 'L' + (l + 1) as keyof Object] = labours[l].ohLabour;
                    completeMaster['OH'+ 'L' + (l + 1) + 'Hrs' as keyof Object] = labours[l].ohHour;
                }

                for(let c = 0; c < overhaul?.overhaulContractors?.length; c++){
                  let contractors = overhaul.overhaulContractors;

                    completeMaster['OH' + 'C' + (c + 1) as keyof Object] = contractors[c].ohLabour;
                    completeMaster['OH' + 'C' + (c + 1) + 'Cst' as keyof Object] = contractors[c].ohHour;
                }


                //adding event into completeMaster object
                for (let i = 0; i < master.events?.length; i++) {
                  let events = master.events;
                  completeMaster['EV' + (i + 1) + ' Title' as keyof Object] = events[i].evTitle;
                  completeMaster['EV' + (i + 1) + ' Every' as keyof Object] = events[i].evOccurence;
                  completeMaster['EV' + (i + 1) + ' Stretch' as keyof Object] = events[i].evStretch;

                  for (let m = 0; m < events[i].eventMaintenance?.length; m++) {
                    let maintenances = events[i].eventMaintenance;

                    completeMaster['Ev' + (i + 1) + 'M' + (m + 1) as keyof Object] = maintenances[m].evMaintenance;
                    completeMaster['Ev' + (i + 1) + 'M' + (m + 1) + 'Cst' as keyof Object] = maintenances[m].evCost;

                  }

                  for (let l = 0; l < events[i].eventLabours?.length; l++) {
                    let eventLabours = events[i].eventLabours;

                    completeMaster['Ev' + (i + 1) + 'L' + (l + 1) as keyof Object] = eventLabours[l].evLabour;
                    completeMaster['Ev' + (i + 1) + 'L' + (l + 1) + 'Hrs' as keyof Object] = eventLabours[l].evHour;

                  }

                  for (let c = 0; c < events[i].eventContractors?.length; c++) {
                    let eventContractors = events[i].eventContractors;

                    completeMaster['Ev' + (i + 1) + 'C' + (c + 1) as keyof Object] = eventContractors[c].evContractor;
                    completeMaster['Ev' + (i + 1) + 'C' + (c + 1) + 'Cst' as keyof Object] = eventContractors[c].evCost;

                  }

                }

                this.masters.push(completeMaster);

                //creates all the headers
                this.transformObjectToArray(completeMaster);

                mi++;
                if(mi == masters?.length)
                {
                  this.transformRows();
                  this.dataSource = this.masters;
                }

                console.log('master', completeMaster);

                // this.cols = [
                //   { field: cMaster.masterId, header: 'Id' },
                //   { field: cMaster.unitDesc, header: 'Unit Description' },
                //   { field: cMaster.oldAssetType, header: 'Asset Type' },
                //   { field: cMaster.newAssetType, header: 'New Asset Type' },
                //   { field: cMaster.oldDescription, header: 'App Description' },
                //   { field: cMaster.newDescription, header: 'New Asset Type Unit Description' },
                //   { field: cMaster.masterStyle, header: 'Style' },
                //   { field: cMaster.masterSize, header: 'Size' },
                //   { field: cMaster.dutyApplication, header: 'Duty / Application' },
                //   { field: cMaster.quality, header: 'Quality' },
                //   { field: cMaster.unitMeasurement, header: 'Unit Measurement' },
                //   { field: cMaster.replacementCost, header: 'Replacement Cost' },
                //   { field: cMaster.lifeMonths, header: 'Life Months' },
                //   { field: cMaster.overhaulLife, header: 'Overhaul Life' },
                //   { field: cMaster.rev, header: 'Rev' },
                // ];

                // for (let i = 0; i < master.events?.length; i++) {
                //   let events = master.events;
                //   let EvTitle = { field: events[i].evTitle, header: 'Ev' + (i + 1) + ' Title' };
                //   let EvEvery = { field: events[i].evOccurence, header: 'Ev' + (i + 1) + ' Every' };
                //   let EvStrch = { field: events[i].evStretch, header: 'Ev' + (i + 1) + ' Stretch' };

                //   this.cols.push(EvTitle);
                //   this.cols.push(EvEvery);
                //   this.cols.push(EvStrch);

                //   //configuring event maintenances fields and headers
                //   for (let m = 0; m < events[i].eventMaintenance?.length; m++) {
                //     let maintenances = events[i].eventMaintenance;
                //     let evM = { field: maintenances[m].evMaintenance, header: 'Ev' + (i + 1) + 'M' + (m + 1) };
                //     let evMC = { field: maintenances[m].evCost, header: 'Ev' + (i + 1) + 'M' + (m + 1) + 'Cst' };

                //     this.cols.push(evM);
                //     this.cols.push(evMC);

                //   }

                //   //configuring event Labors fields and headers
                //   for (let l = 0; l < events[i].eventLabours?.length; l++) {
                //     let eventLabours = events[i].eventLabours;
                //     let evL = { field: eventLabours[l].evLabour, header: 'Ev' + (i + 1) + 'L' + (l + 1) };
                //     let evLH = { field: eventLabours[l].evHour, header: 'Ev' + (i + 1) + 'L' + (l + 1) + 'Hrs' };

                //     this.cols.push(evL);
                //     this.cols.push(evLH);

                //   }

                //   //configuring event Contractors fields and headers
                //   for (let c = 0; c < events[i].eventContractors?.length; c++) {
                //     let eventContractors = events[i].eventContractors;
                //     let evC = { field: eventContractors[c].evContractor, header: 'Ev' + (i + 1) + 'C' + (c + 1) };
                //     let evCCst = { field: eventContractors[c].evCost, header: 'Ev' + (i + 1) + 'C' + (c + 1) + 'Cst' };

                //     this.cols.push(evC);
                //     this.cols.push(evCCst);

                //   }


                // }
                // this.getHeader(master);
              },
              error: (_) => {
                this.masterService.openSnackBar('some error occured', 'close')
              }
            })
          })
          // this.sortAssets({ active: 'oldAssetType', direction: 'asc' });
          this.isLoading = false;
        },
        error: (_) => {
          this.isLoading = false;
          this.masterService.openSnackBar('No pending record found in master table.', 'close');
        },
      }
    );
  }

  // getHeader(master: any) {

  //   this.getMaxEvents(master);
  //   // console.log('max events', this.maxEvents)

  //   this.getMaxeventMaintenance(master);
  //   // console.log('max evMaintenace', this.maxEventMaintenance)

  //   this.getMaxEventLabours(master);
  //   // console.log('max evLabor', this.maxEventLabours)

  //   this.getMaxEventContractors(master);
  //   // console.log('max evCont', this.maxEventContractors)

  // }

  // getMaxEvents(master: any) {
  //   if (master.events.length > this.maxEvents) {
  //     this.maxEvents = master.events.length;
  //   }
  // }

  // getMaxeventMaintenance(master: any) {
  //   master.events.forEach((event: any) => {
  //     if (event.eventMaintenance.length > this.maxEventMaintenance) {
  //       this.maxEventMaintenance = event.eventMaintenance.length;
  //     }
  //   });
  // }

  // getMaxEventLabours(master: any) {
  //   master.events.forEach((event: any) => {
  //     if (event.eventLabours.length > this.maxEventLabours) {
  //       this.maxEventLabours = event.eventLabours.length;
  //     }
  //   });
  // }

  // getMaxEventContractors(master: any) {
  //   master.events.forEach((event: any) => {
  //     if (event.eventContractors.length > this.maxEventContractors) {
  //       this.maxEventContractors = event.eventContractors.length;
  //     }
  //   });
  // }

  // sortAssets(sort: any) {
  //   const data = this.masters.slice();
  //   if (!sort.active || sort.direction === '') {
  //     return;
  //   }

  //   this.sortedMasters = data.sort((a: any, b: any) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'masterId':
  //         return this.compare(a.masterId, b.masterId, isAsc);
  //       case 'unitDescription':
  //         return this.compare(a.unitDescription, b.unitDescription, isAsc);
  //       case 'oldAssetType':
  //         return this.compare(a.oldAssetType, b.oldAssetType, isAsc);
  //       case 'newAssetType':
  //         return this.compare(a.newAssetType, b.newAssetType, isAsc);
  //       case 'masterStyle':
  //         return this.compare(a.masterStyle, b.masterStyle, isAsc);
  //       case 'masterSize':
  //         return this.compare(a.masterSize, b.masterSize, isAsc);
  //       case 'oldDescription':
  //         return this.compare(a.oldDescription, b.oldDescription, isAsc);
  //       case 'newDescription':
  //         return this.compare(a.newDescription, b.newDescription, isAsc);
  //       case 'unitMeasurement':
  //         return this.compare(a.unitMeasurement, b.unitMeasurement, isAsc);
  //       case 'dutyApplication':
  //         return this.compare(a.dutyApplication, b.dutyApplication, isAsc);
  //       case 'quality':
  //         return this.compare(a.quality, b.quality, isAsc);
  //       case 'rev':
  //         return this.compare(a.rev, b.rev, isAsc);
  //       case 'replacementCost':
  //         return this.compare(a.replacementCost, b.replacementCost, isAsc);
  //       case 'lifeMonths':
  //         return this.compare(a.lifeMonths, b.lifeMonths, isAsc);
  //       case 'OHLife':
  //         return this.compare(a.overhaulLife, b.overhaulLife, isAsc);
  //       default:
  //         return 0;
  //     }
  //   });
  // }

  // compare(a: number | string, b: number | string, isAsc: boolean): any {
  //   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  // }

}
