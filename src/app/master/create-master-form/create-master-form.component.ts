import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SummaryService } from 'src/app/summary/summary.service';
import { UserService } from 'src/app/users/user.service';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-create-master-form',
  templateUrl: './create-master-form.component.html',
  styleUrls: ['./create-master-form.component.scss'],
})
export class CreateMasterFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private summaryService:SummaryService,
    private userService: UserService
  ) {}

  editMasterId: any;
  form: FormGroup = this.initialForm();
  siteId: any = localStorage.getItem('siteId');
  isLoading: boolean = false;

  ngOnInit(): void {
    this.masterService.currentMasterId.subscribe((masterId: any) => {
      if (masterId) {
        this.populateEditMasterForm(masterId);
      }
    });
  }

  initialForm() {
    return (this.form = this.fb.group({
      oldAssetType: ['', Validators.required],
      masterStyle: [''],
      newAssetType: ['', Validators.required],
      masterSize: [''],
      oldDescription: [''],
      newDescription: [''],
      unitMeasurement: [''],
      rev: [''],
      replacementCost: [''],
      lifeMonths: [''],
      overhaulLife: [''],
      ovTitle: [''],
      ovStretch: [''],
      events: this.fb.array([]),
      overhaulMaintenances: this.fb.array([]),
      overhaulLabors: this.fb.array([]),
      overhaulContractors: this.fb.array([]),
    }));
  }

  populateEditMasterForm(masterId: any) {
    this.editMasterId = masterId;
    this.isLoading = true;
    this.masterService.getCompleteMasterById(masterId).subscribe((el: any) => {
      const _masterComplete = el;

      const _master = _masterComplete.master;

      const _overhaul = _masterComplete.overhaul;

      let c = this.initialForm().controls;
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
      c.unitMeasurement.setValue(
        _master.unitMeasurement ? _master.unitMeasurement : ''
      );
      c.rev.setValue(_master.rev ? _master.rev : '');
      c.replacementCost.setValue(
        _master.replacementCost ? _master.replacementCost : ''
      );
      c.lifeMonths.setValue(_master.lifeMonths ? _master.lifeMonths : '');
      c.overhaulLife.setValue(_master.overhaulLife ? _master.overhaulLife : '');
      c.ovTitle.setValue(
        _overhaul ? (_overhaul.ovTitle ? _overhaul.ovTitle : '') : ''
      );
      c.ovStretch.setValue(
        _overhaul ? (_overhaul.ovStretch ? _overhaul.ovStretch : '') : ''
      );

      const _events = _masterComplete.events;

      if (_events) {
        _events.forEach((event: any) => {
          this.addEvent(event);
        });
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
    this.form = this.initialForm();
  }

  onSubmit() {
    this.postformMaster();
    this.resetForm();
  }

  postformMaster() {
    this.masterService.deleteMaster(this.editMasterId).subscribe((res: any) => {
      console.log(res);
    });

    this.summaryService.getSummariesByMasterId(this.editMasterId).subscribe({
      next:(summaries:any)=>{
        summaries.forEach((summary:any) => {
          
        });
      }
    })

    let f = this.form.value;

    const master = {
      siteId: this.siteId,
      oldAssetType: f.oldAssetType,
      masterStyle: f.masterStyle,
      newAssetType: f.newAssetType,
      masterSize: f.masterSize,
      oldDescription: f.oldDescription,
      newDescription: f.newDescription,
      unitMeasurement: f.unitMeasurement,
      rev: f.rev,
      replacementCost: f.replacementCost,
      lifeMonths: f.lifeMonths,
      overhaulLife: f.overhaulLife,
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
        this.userService.openSnackBar('Master Created/Edited', 'close');
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
      evTitle: [event ? event.evTitle : '', Validators.required],
      evOccurence: [event ? event.evOccurence : '', Validators.required],
      evStretch: [event ? event.evStretch : '', Validators.required],
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
