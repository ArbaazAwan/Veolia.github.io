import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-create-master-form',
  templateUrl: './create-master-form.component.html',
  styleUrls: ['./create-master-form.component.scss'],
})
export class CreateMasterFormComponent implements OnInit {
  constructor(private fb: FormBuilder, private masterService: MasterService) {}

  editMasterId: any;
  form!: FormGroup;
  siteId: any = localStorage.getItem('siteId');
  isLoading: boolean = false;

  ngOnInit(): void {
    this.initializeForm();
    this.masterService.getCompleteMasterById(150).subscribe((el: any) => {
      const _masterComplete = el;
      const events = _masterComplete.events;
      this.initializeForm();
      // events.forEach((event: any) => {
      //   console.log('i am here');
      //   this.addEvent(event);
      // });
      for (let index = 0; index < events.length; index++) {
        // const element = array[index];
        this.addEvent(events[index]);
      }
    });

    // this.addEvent();
  }

  initializeForm() {
    this.editMasterId = 148; //hard coded value
    localStorage.getItem('masterId');
    this.createForm(); //initial form
    // if (this.editMasterId != null && this.editMasterId != '') {
    //   this.editForm(this.editMasterId);
    //   // localStorage.removeItem('masterId'); //reset the id
    // }
  }

  createForm() {
    this.form = this.fb.group({
      oldAssetType: ['', Validators.required],
      masterStyle: ['', Validators.required],
      newAssetType: ['', Validators.required],
      masterSize: ['', Validators.required],
      oldDescription: ['', Validators.required],
      newDescription: ['', Validators.required],
      unitMeasurement: ['', Validators.required],
      rev: ['', Validators.required],
      replacementCost: ['', Validators.required],
      lifeMonths: ['', Validators.required],
      overhaulLife: ['', Validators.required],
      ovTitle: ['', Validators.required],
      ovStretch: ['', Validators.required],
      events: this.fb.array([]),
      overhaulMaintenances: this.fb.array([]),
      overhaulLabors: this.fb.array([]),
      overhaulContractors: this.fb.array([]),
    });
  }

  editForm(masterId: any) {
    this.isLoading = true;
    this.masterService.getCompleteMasterById(masterId).subscribe((el: any) => {
      const _masterComplete = el;
      console.log('this is complete master:', _masterComplete);

      const _master = _masterComplete.master;
      console.log('this is master:', _master);

      const _events = _masterComplete.events;
      console.log('this is events:', _events);

      if (_events) {
        _events.forEach((event: any) => {
          console.log('i am here');
          this.addEvent(event);
        });
      }

      const _overhaul = _masterComplete.overhaul;
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

      this.form = this.fb.group({
        oldAssetType: [_master.oldAssetType, Validators.required],
        masterStyle: [_master.masterStyle, Validators.required],
        newAssetType: [_master.newAssetType, Validators.required],
        masterSize: [_master.masterSize, Validators.required],
        oldDescription: [_master.oldDescription, Validators.required],
        newDescription: [_master.newDescription, Validators.required],
        unitMeasurement: [_master.unitMeasurement, Validators.required],
        rev: [_master.rev, Validators.required],
        replacementCost: [_master.replacementCost, Validators.required],
        lifeMonths: [_master.lifeMonths, Validators.required],
        overhaulLife: [_master.overhaulLife, Validators.required],
        ovTitle: [
          _overhaul ? (_overhaul.ovTitle ? _overhaul.ovTitle : '') : '',
          Validators.required,
        ],
        ovStretch: [
          _overhaul ? (_overhaul.ovStretch ? _overhaul.ovStretch : '') : '',
          Validators.required,
        ],
        overhaulMaintenances: this.fb.array([]),
        overhaulLabors: this.fb.array([]),
        overhaulContractors: this.fb.array([]),
        events: this.fb.array([]),
      });

      this.isLoading = false;
    });
  }

  resetForm() {
    this.form.reset();
  }

  onSubmit() {
    this.postformMaster();
    this.resetForm();
  }

  postformMaster() {
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

    // console.log("this is complete Master:",completeMaster);

    this.masterService
      .postCompleteMaster(completeMaster)
      .subscribe((res: any) => {
        console.log(res.message);
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
    console.log(this.events());
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

  removeMaintenance(index: number) {
    this.maintenances(index).removeAt(index);
  }

  removeOverhaulMaintenance(index: number) {
    this.overhaulMaintenances().removeAt(index);
  }

  removeLabor(i: number) {
    this.labors(i).removeAt(i);
  }

  removeOverhaulLabor(i: number) {
    this.overhaulLabors().removeAt(i);
  }

  removeCont(i: number) {
    this.conts(i).removeAt(i);
  }

  removeOverhaulCont(i: number) {
    this.overhaulConts().removeAt(i);
  }
}
