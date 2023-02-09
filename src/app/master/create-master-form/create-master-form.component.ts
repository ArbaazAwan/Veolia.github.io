import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/users/user.service';
import { MasterService } from '../master.service';
import { NodeService } from '../view-master-table/node.service';

@Component({
  selector: 'app-create-master-form',
  templateUrl: './create-master-form.component.html',
  styleUrls: ['./create-master-form.component.scss'],
})
export class CreateMasterFormComponent implements OnInit {
  constructor(private fb: FormBuilder, private masterService: MasterService,
    private nodeService: NodeService, private userService: UserService) { }

  @ViewChild('modalClose') modalClose: ElementRef;
  editMasterId: any;
  form: FormGroup = this.initialForm();
  siteId: any = localStorage.getItem('siteId');
  isLoading: boolean = false;
  masterId: any;
  files: any;
  cols: any[] = [];
  tabIndex: number = 0;
  isEditForm: boolean = false;
  private role: any;
  private userName: string = '';

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.getUserName();
    this.resetForm();
    this.masterService.currentMasterId.subscribe((masterId: any) => {
      if (masterId) {
        this.populateEditMasterForm(masterId);
      }
    });
  }

  getUserName() {
    let userEmail = localStorage.getItem('user_email');
    this.userService.getUserByEmail(userEmail).subscribe(
      {
        next: (res:any) => {
          this.userName = res[0].userName;
        },
        error:(response:any)=>{
          this.masterService.openSnackBar(response.message, 'close');
        }
      }
    )
  }

  initialForm() {
    return (this.form = this.fb.group({
      masterId: [{ value: '', disabled: true }],
      oldAssetType: [''],
      masterStyle: [''],
      newAssetType: [''],
      masterSize: [''],
      oldDescription: [''],
      newDescription: [''],
      dutyApplication: [''],
      quality: [''],
      unitMeasurement: [''],
      rev: [''],
      replacementCost: [''],
      lifeMonths: [''],
      overhaulLife: [''],
      editedBy: [''],
      createdBy: [''],
      ovTitle: [''],
      ovStretch: [''],
      unitDesc: [''],
      events: this.fb.array([]),
      overhaulMaintenances: this.fb.array([]),
      overhaulLabors: this.fb.array([]),
      overhaulContractors: this.fb.array([]),
    }));
  }

  populateEditMasterForm(masterId: any) {
    this.isEditForm = true;
    this.editMasterId = masterId;
    this.isLoading = true;
    this.masterService.getCompleteMasterById(masterId).subscribe((el: any) => {
      const _masterComplete = el;
      this.files = this.nodeService.getFilesystem(_masterComplete);

      const _master = _masterComplete.master;

      const _overhaul = _masterComplete.overhaul;

      let c = this.initialForm().controls;
      c.masterId.setValue(_master.masterId);
      c.oldAssetType.setValue(_master.oldAssetType ? _master.oldAssetType : '');
      c.masterStyle.setValue(_master.masterStyle ? _master.masterStyle : '');
      c.newAssetType.setValue(_master.newAssetType ? _master.newAssetType : '');
      c.masterSize.setValue(_master.masterSize ? _master.masterSize : '');
      c.oldDescription.setValue(
        _master.oldDescription ? _master.oldDescription : ''
      );
      c.newDescription.setValue(
        _master.newDescription ? _master.newDescription : ''
      );
      c.dutyApplication.setValue(
        _master.dutyApplication ? _master.dutyApplication : ''
      );
      c.quality.setValue(_master.quality ? _master.quality : '');
      c.unitMeasurement.setValue(
        _master.unitMeasurement ? _master.unitMeasurement : ''
      );
      c.rev.setValue(_master.rev ? _master.rev : '');
      c.replacementCost.setValue(
        _master.replacementCost ? _master.replacementCost : ''
      );
      c.unitDesc.setValue(_master.unitDesc ? _master.unitDesc : '');
      c.lifeMonths.setValue(_master.lifeMonths ? _master.lifeMonths : '');
      c.overhaulLife.setValue(_master.overhaulLife ? _master.overhaulLife : '');
      c.ovTitle.setValue(
        _overhaul ? (_overhaul.ovTitle ? _overhaul.ovTitle : '') : ''
      );
      c.ovStretch.setValue(
        _overhaul ? (_overhaul.ovStretch ? _overhaul.ovStretch : '') : ''
      );
      c.createdBy.setValue(_master.createdBy);

      const _events = _masterComplete.events;

      if (_events) {
        this.cols = [
          { field: 'desc', header: '' },
          { field: 'oh', header: 'Overhaul' },
        ];

        for (let i = 0; i < _events?.length; i++) {
          let obj = { field: 'ev' + (i + 1), header: 'Event ' + (i + 1) };
          this.cols.push(obj);
        }

        _events.forEach((event: any) => {
          this.addEvent(event);
        });
        //focus on first tab
        this.tabIndex = 0;
      }

      if (_overhaul) {
        if (_overhaul.overhaulMaintenance) {
          _overhaul.overhaulMaintenance.forEach((ovM: any) => {
            this.addOverhaulMaintenance(ovM);
          });
        }
        if (_overhaul.overhaulLabours) {
          _overhaul.overhaulLabours.forEach((ovL: any) => {
            this.addOverhaulLabor(ovL);
          });
        }
        if (_overhaul.overhaulContractors) {
          _overhaul.overhaulContractors.forEach((ovC: any) => {
            this.addOverhaulCont(ovC);
          });
        }
      }

      this.isLoading = false;
    });
  }

  resetForm() {
    this.isEditForm = false;
    this.form.reset();
    this.form = this.initialForm();
    this.addEvent();
    this.tabIndex = 0;
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup)
        this.validateAllFormFields(control);
    });
  }

  onSubmit() {
    this.form.get('rev')?.setValue(new Date());
    if (this.form.valid) {
      this.postformMaster();
      this.modalClose.nativeElement.click();
    }
    else {
      this.validateAllFormFields(this.form);
    }

  }

  postformMaster() {
    let f = this.form.getRawValue();

    const master:any = {
      siteId: this.siteId,
      oldAssetType: f.oldAssetType,
      masterStyle: f.masterStyle,
      newAssetType: f.newAssetType,
      masterSize: f.masterSize,
      oldDescription: f.oldDescription,
      newDescription: f.newDescription,
      dutyApplication: f.dutyApplication,
      quality: f.quality,
      unitMeasurement: f.unitMeasurement,
      rev: f.rev,
      replacementCost: f.replacementCost,
      lifeMonths: f.lifeMonths,
      overhaulLife: f.overhaulLife,
      unitDesc: f.oldAssetType + " - " + f.newAssetType
        + ", " + f.masterStyle + ", " + f.masterSize
        + ", " + f.dutyApplication + ", " + f.quality,
      masterStatus: this.role == 'admin' ? true : false,
      createdBy: f.createdBy ? f.createdBy: this.userName,
      editedBy: this.isEditForm ? this.userName : null,
    };

    let completeMaster = {
      master: master,
      overhaul: {
        ovTitle: f.ovTitle,
        ovStretch: f.ovStretch,
        overhaulMaintenance: f.overhaulMaintenances, //maintenance array
        overhaulLabours: f.overhaulLabors, //labors array
        overhaulContractors: f.overhaulContractors, //contractors array
      },
      events: f.events, //events array
    };

    this.masterService
      .postCompleteMaster(completeMaster)
      .subscribe((res: any) => {
        if (this.isEditForm) {
          let newMasterId = res.message;
          let oldMasterId = this.editMasterId;
          //getting all the summaries by masterId
          this.masterService.updateMaster(this.editMasterId).subscribe({
            next: (res: any) => {
              let updateAssetIdData = {
                newMasterId: newMasterId,
                oldMasterId: oldMasterId,
              };
              this.masterService.updateAssetId(updateAssetIdData).subscribe({
                next: (response: any) => {
                  this.masterService.openSnackBar(response.message, 'close');
                },
                error: (err) => {
                  this.masterService.openSnackBar(err.error.message, 'close');
                },
              });
            },
            error: (err) => {
              this.masterService.openSnackBar(err.error.message, 'close');
            },
          });
        } else {
          this.masterService.openSnackBar('Master Record is Created', 'close');
        }
      });
  }

  events(): FormArray {
    return this.form.get('events') as FormArray;
  }

  maintenances(index: any): FormArray {
    return <FormArray>this.events().at(index).get('eventMaintenance');
  }

  overhaulMaintenances(): FormArray {
    return this.form.get('overhaulMaintenances') as FormArray;
  }

  labors(index: any): FormArray {
    return this.events().at(index).get('eventLabours') as FormArray;
  }

  overhaulLabors(): FormArray {
    return this.form.get('overhaulLabors') as FormArray;
  }

  conts(index: any): FormArray {
    return this.events().at(index).get('eventContractors') as FormArray;
  }

  overhaulConts(): FormArray {
    return this.form.get('overhaulContractors') as FormArray;
  }

  newEvent(event?: any) {
    return this.fb.group({
      evTitle: [event ? event.evTitle : ''],
      evOccurence: [event ? event.evOccurence : ''],
      evStretch: [event ? event.evStretch : ''],
      eventMaintenance: this.fb.array([]),
      eventLabours: this.fb.array([]),
      eventContractors: this.fb.array([]),
    });
  }

  newMaintenance(maintenance?: any) {
    return this.fb.group({
      evMaintenance: maintenance ? maintenance.evMaintenance : '',
      evCost: maintenance ? maintenance.evCost : '',
    });
  }

  newOverhaulMaintenance(ovM?: any) {
    return this.fb.group({
      ohMaintenance: ovM ? ovM.ohMaintenance : '',
      ohCost: ovM ? ovM.ohCost : '',
    });
  }

  newLabor(evLabour?: any): FormGroup {
    return this.fb.group({
      evLabour: evLabour ? evLabour.evLabour : '',
      evHour: evLabour ? evLabour.evHour : '',
    });
  }

  newOverhaulLabor(ovL?: any): FormGroup {
    return this.fb.group({
      ohLabour: ovL ? ovL.ohLabour : '',
      ohHour: ovL ? ovL.ohHour : '',
    });
  }

  newCont(evContractor?: any) {
    return this.fb.group({
      evContractor: evContractor ? evContractor.evContractor : '',
      evCost: evContractor ? evContractor.evCost : '',
    });
  }

  newOverhaulCont(ovC?: any) {
    return this.fb.group({
      ohLabour: ovC ? ovC.ohLabour : '',
      ohHour: ovC ? ovC.ohHour : '',
    });
  }

  addEvent(event?: any) {
    this.events().push(this.newEvent(event));
    let eventIndex = (<FormArray>this.form.get('events')).length - 1;

    this.tabIndex = this.events().length;

    if (this.isEditForm) {
      this.tabIndex++;
    }

    if (event) {
      if (!!event.eventMaintenance) {
        event.eventMaintenance.forEach((evMaintenance: any) => {
          this.addMaintenance(eventIndex, evMaintenance);
        });
      }
      if (event.eventLabours) {
        event.eventLabours.forEach((evLabour: any) => {
          this.addLabor(eventIndex, evLabour);
        });
      }
      if (event.eventContractors) {
        event.eventContractors.forEach((evContractor: any) => {
          this.addCont(eventIndex, evContractor);
        });
      }
    }
  }

  addMaintenance(index: any, maintenance?: any) {
    this.maintenances(index).push(this.newMaintenance(maintenance));
  }

  addOverhaulMaintenance(ovM?: any) {
    this.overhaulMaintenances().push(this.newOverhaulMaintenance(ovM));
  }

  addLabor(index: any, evLabour?: any) {
    this.labors(index).push(this.newLabor(evLabour));
  }

  addOverhaulLabor(ovL?: any) {
    this.overhaulLabors().push(this.newOverhaulLabor(ovL));
  }

  addCont(index: any, evContractor?: any) {
    this.conts(index).push(this.newCont(evContractor));
  }

  addOverhaulCont(ovC?: any) {
    this.overhaulConts().push(this.newOverhaulCont(ovC));
  }

  removeEvent(index: number) {
    this.events().removeAt(index);
    this.tabIndex = this.events().length;

    if (this.isEditForm) {
      this.tabIndex++;
    }
  }

  removeMaintenance(eventIndex: any, index: number) {
    this.maintenances(eventIndex).removeAt(index);
  }

  removeOverhaulMaintenance(index: number) {
    this.overhaulMaintenances().removeAt(index);
  }

  removeLabor(eventIndex: any, i: number) {
    this.labors(eventIndex).removeAt(i);
  }

  removeOverhaulLabor(i: number) {
    this.overhaulLabors().removeAt(i);
  }

  removeCont(eventIndex: any, i: number) {
    this.conts(eventIndex).removeAt(i);
  }

  removeOverhaulCont(i: number) {
    this.overhaulConts().removeAt(i);
  }
}
