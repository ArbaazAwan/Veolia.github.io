import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/users/user.service';
import { MasterService } from '../master.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewApproveMasterComponent } from './view-approve-master/view-approve-master.component';

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
  displayedColumns: string[] = ['actions'];
  dataSource: any[] = [];
  userName: string = '';

  constructor(
    private masterService: MasterService,
    private userService: UserService,
    private _NgbModal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getUserName();
    this.getPendingMasters();
  }

  createEventsKeys(keys: string[]) {
    var eventsKeys: string[] = [];

    let maxEvents = 0;

    for (let i = 0; i < keys.length; i++) {
      let index = parseInt(keys[i].substring(2)); // extract the index after 'Ev'
      if (index > maxEvents) {
        maxEvents = index;
      }
    }

    for (let eventIndex = 0; eventIndex < maxEvents; eventIndex++) {
      const i = eventIndex + 1;

      // finding maintenance in an event
      var pattern = 'Ev' + i + 'M.*';
      var re = new RegExp(pattern);
      let maintenanceLength = keys.filter((key) =>
        re.test(key)
      );
      const mainLength = maintenanceLength.length / 2;

      // finding Labour in an event
      var pattern = 'Ev' + i + 'L.*';
      var re = new RegExp(pattern);
      let labourLength = keys.filter((key) => re.test(key));
      const LabLength = labourLength.length / 2;

      // finding Contractor in an event
      var pattern = 'Ev' + i + 'C.*';
      var re = new RegExp(pattern);
      let contLength = keys.filter((key) => re.test(key));
      const contratorLength = contLength.length / 2;

      const evTitle = 'Ev' + (eventIndex + 1) + ' Title';
      const evOccurence = 'Ev' + (eventIndex + 1) + ' Every';
      const evStretch = 'Ev' + (eventIndex + 1) + ' Stretch';

      eventsKeys.push(evTitle);
      eventsKeys.push(evOccurence);
      eventsKeys.push(evStretch);

      for (let mainIndex = 0; mainIndex < mainLength; mainIndex++) {
        let dataIndex = 'Ev' + (eventIndex + 1) + 'M' + (mainIndex + 1);
        let cIndex = 'Ev' + (eventIndex + 1) + 'M' + (mainIndex + 1) + 'Cst';

        eventsKeys.push(dataIndex);
        eventsKeys.push(cIndex);
      }

      for (let mainIndex = 0; mainIndex < LabLength; mainIndex++) {
        let dataIndex = 'Ev' + (eventIndex + 1) + 'L' + (mainIndex + 1);
        let cIndex = 'Ev' + (eventIndex + 1) + 'L' + (mainIndex + 1) + 'Hrs';

        eventsKeys.push(dataIndex);
        eventsKeys.push(cIndex);
      }

      for (let mainIndex = 0; mainIndex < contratorLength; mainIndex++) {
        let dataIndex = 'Ev' + (eventIndex + 1) + 'C' + (mainIndex + 1);
        let cIndex = 'Ev' + (eventIndex + 1) + 'C' + (mainIndex + 1) + 'Cst';

        eventsKeys.push(dataIndex);
        eventsKeys.push(cIndex);

      }
    }
    return eventsKeys;
  }

  createOverhaulArray(keys: string[]) {
    var overhaulKeys: string[] = [];
    // finding Maintenance in Overhaul
    var pattern = 'OHM.*';
    var re = new RegExp(pattern);
    let ovLength = keys.filter((key) => re.test(key));
    const ovMLength = ovLength.length / 2;
    // finding Maintenance in Overhaul

    overhaulKeys.push('OH Title');
    overhaulKeys.push('OH Stretch');

    for (let mainIndex = 0; mainIndex < ovMLength; mainIndex++) {
      let dataIndex = 'OHM' + (mainIndex + 1);
      let cIndex = 'OHM' + (mainIndex + 1) + 'Cst';

      overhaulKeys.push(dataIndex);
      overhaulKeys.push(cIndex);
    }

    // finding Labour in Overhaul
    var pattern = 'OHL.*';
    var re = new RegExp(pattern);
    let ovlLength = keys.filter((key) => re.test(key));
    const ovLLength = ovlLength.length / 2;
    // finding Labour in Overhaul
    for (let mainIndex = 0; mainIndex < ovLLength; mainIndex++) {
      let dataIndex = 'OHL' + (mainIndex + 1);
      let cIndex = 'OHL' + (mainIndex + 1) + 'Hrs';

      overhaulKeys.push(dataIndex);
      overhaulKeys.push(cIndex);
    }

    // finding Contractor in Overhaul
    var pattern = 'OHC.*';
    var re = new RegExp(pattern);
    let ovcLength = keys.filter((key) => re.test(key));
    const ovCLength = ovcLength.length / 2;
    // finding Contractor in Overhaul
    for (let mainIndex = 0; mainIndex < ovCLength; mainIndex++) {
      let dataIndex = 'OHC' + (mainIndex + 1);
      let cIndex = 'OHC' + (mainIndex + 1) + 'Cst';

      overhaulKeys.push(dataIndex);
      overhaulKeys.push(cIndex);
    }

    return overhaulKeys;
  }

  openModal(assetId: any) {
    let modalRef = this._NgbModal.open(ViewApproveMasterComponent,
      { fullscreen: true, backdrop: 'static' }
    );
    modalRef.componentInstance.assetId = assetId;
    modalRef.componentInstance.approveEvent.subscribe(
      (masterId: any) => {
        this.approveMaster(masterId);
      }
    );
    modalRef.componentInstance.rejectEvent.subscribe(
      (masterId: any) => {
        this.rejectMaster(masterId);
      }
    );
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

  transformRows() {

    this.displayedColumns = this.reOrderDisplayColumns(this.displayedColumns);
    this.masters?.forEach(
      (master: any) => {
        let masterKeys = Object.keys(master);

        for (const key of this.displayedColumns) {
          if (masterKeys.includes(key)) {
            continue;
          }
          master[key as keyof Object] = null;
        }
      });
  }

  reOrderDisplayColumns(displayedColumns: any) {

    let masterOnlyKeys = displayedColumns.slice(0, 19);
    let overhaulKeys = this.createOverhaulArray(displayedColumns);
    let eventsKeys = this.createEventsKeys(displayedColumns);

    let cols = [
      ...masterOnlyKeys,
      ...overhaulKeys,
      ...eventsKeys
    ];

    return cols;
  }

  approveMaster(masterId: any) {
    this.masterService.approveMaster(masterId, this.userName).subscribe({
      next: (_) => {
        this.masterService.openSnackBar('master approved!', 'close');
        this.getPendingMasters();
      },
      error: (_) => {
        this.masterService.openSnackBarWithoutReload('error occured during approval', 'close');
      }
    })
  }

  rejectMaster(masterId: any) {
    this.masterService.rejectMasterById(masterId).subscribe({
      next: (_) => {
        this.masterService.openSnackBar('record deleted!', 'close');
        this.getPendingMasters();
      },
      error: (_) => {
        this.masterService.openSnackBarWithoutReload('error occured during deletion', 'close');
      }
    })
  }

  getUserName() {
    let userEmail = localStorage.getItem('user_email');
    this.userService.getUserByEmail(userEmail).subscribe({

      next: (res: any) => {
        this.userName = res[0].userName;
      },
      error: (response: any) => {
        this.masterService.openSnackBarWithoutReload(response.message, 'close');
      }
    })
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

                var completeMaster: any = {};

                let cMaster = master.master;
                let overhaul = master?.overhaul;
                let events = master?.events;

                //adding master into completeMaster object
                completeMaster['Id' as keyof Object] = cMaster.masterId;
                completeMaster['Created By' as keyof Object] = cMaster.createdBy;
                completeMaster['Edited By' as keyof Object] = cMaster.editedBy;
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
                completeMaster['Asset Id' as keyof Object] = cMaster.assetId;

                //adding overhaul into completeMaster object
                completeMaster['OH Title' as keyof Object] = overhaul.ovTitle;
                completeMaster['OH Stretch' as keyof Object] = overhaul.ovStretch;

                for (let m = 0; m < overhaul?.overhaulMaintenance?.length; m++) {
                  let maintenances = overhaul?.overhaulMaintenance;

                  completeMaster['OH' + 'M' + (m + 1) as keyof Object] = maintenances[m].ohMaintenance;
                  completeMaster['OH' + 'M' + (m + 1) + 'Cst' as keyof Object] = maintenances[m].ohCost;
                }

                for (let l = 0; l < overhaul?.overhaulLabours?.length; l++) {
                  let labours = overhaul.overhaulLabours;

                  completeMaster['OH' + 'L' + (l + 1) as keyof Object] = labours[l].ohLabour;
                  completeMaster['OH' + 'L' + (l + 1) + 'Hrs' as keyof Object] = labours[l].ohHour;
                }

                for (let c = 0; c < overhaul?.overhaulContractors?.length; c++) {
                  let contractors = overhaul.overhaulContractors;

                  completeMaster['OH' + 'C' + (c + 1) as keyof Object] = contractors[c].ohLabour;
                  completeMaster['OH' + 'C' + (c + 1) + 'Cst' as keyof Object] = contractors[c].ohHour;
                }


                //adding event into completeMaster object
                for (let i = 0; i < events?.length; i++) {

                  completeMaster['Ev' + (i + 1) + ' Title' as keyof Object] = events[i].evTitle;
                  completeMaster['Ev' + (i + 1) + ' Every' as keyof Object] = events[i].evOccurence;
                  completeMaster['Ev' + (i + 1) + ' Stretch' as keyof Object] = events[i].evStretch;

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
                if (mi == masters?.length) {
                  this.transformRows();
                  this.masters = this.masters
                    .sort((a: any, b: any) => {
                      //descending sort
                      return b['Id'] - a['Id'];
                    });
                  this.dataSource = this.masters;
                  this.isLoading = false;
                }
              },
              error: (_) => {
                this.masterService.openSnackBarWithoutReload('error occured on getCompleteMaster', 'close')
              }
            })
          })
        },
        error: (_) => {
          this.isLoading = false;
          this.masterService.openSnackBarWithoutReload('No pending record found in master table.', 'close');
        },
      }
    );
  }

}
