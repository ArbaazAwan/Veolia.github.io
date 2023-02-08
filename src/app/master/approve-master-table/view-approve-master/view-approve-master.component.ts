import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-view-approve-master',
  templateUrl: './view-approve-master.component.html',
  styleUrls: ['./view-approve-master.component.scss']
})
export class ViewApproveMasterComponent implements OnInit {

  @Input() assetId: any;
  @Input() displayedColumns: string[] = [];
  isLoading: boolean = false;
  dataSource: any = [];
  masters: any = [];

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private masterService: MasterService,
  ) { }

  ngOnInit(): void {
    this.getMastersByAssetId(this.assetId);
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


  getMastersByAssetId(assetId: number) {
    this.isLoading = true;
    this.masterService.getMastersByAssetId(assetId)
      .subscribe(
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
                  if (mi == masters?.length) {
                    this.transformRows();
                    this.masters = this.masters
                      .sort((a: any, b: any) => {
                        //ascending sort
                        return a['Id'] - b['Id'];
                      })
                      .slice(-2); //get only last two elements
                    this.dataSource = this.masters;
                  }
                },
                error: (_) => {
                  this.masterService.openSnackBar('some error occured', 'close')
                }
              })
            })
            this.isLoading = false;
          },
          error: (_) => {
            this.isLoading = false;
          },
        }
      )
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

}
