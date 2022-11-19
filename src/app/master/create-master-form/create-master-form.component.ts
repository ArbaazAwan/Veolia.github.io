import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-master-form',
  templateUrl: './create-master-form.component.html',
  styleUrls: ['./create-master-form.component.scss']
})
export class CreateMasterFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }


  form!: FormGroup;
  siteId: any = localStorage.getItem('siteId');

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
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
      overhaulConts: this.fb.array([]),
    });
  }

  resetForm(){
    this.form.reset();
  }


  onSubmit() {
    this.getformMaster();
    this.resetForm();
  }

  getformMaster() {
    let f = this.form.value;

    const master = {
      "siteId": this.siteId,
      "oldAssetType": f.oldAssetType,
      "masterStyle": f.masterStyle,
      "newAssetType": f.newAssetType,
      "masterSize": f.masterSize,
      "oldDescription": f.oldDescription,
      "newDescription": f.newDescription,
      "unitMeasurement": f.unitMeasurement,
      "rev": f.rev,
      "replacementCost": f.replacementCost,
      "lifeMonths": f.lifeMonths,
      "overhaulLife": f.overhaulLife
    };

    let overhaulMaintenances = f.overhaulMaintenances;

    let overhaulLabours = f.overhaulLabors;

    let overhaulContractors = f.overhaulConts;

    let events = f.events;

    let completeMaster = {

      master: master,
      overHaul: {
        ovTitle: f.ovTitle,
        ovStretch: f.ovStretch,
        overhaulMaintenances: overhaulMaintenances, //maintenance array
        overhaulLabours: overhaulLabours,             //labors array
        OverhaulContractors: overhaulContractors   //contractors array
      },
      events: events, //events array

    }

    console.log("complete form:", this.form.value);
    console.log("this is master:", completeMaster);

  }


  events(): FormArray {
    return <FormArray>this.form.get('events');
  }

  maintenances(index:any): FormArray {
    return <FormArray>this.events()
    .at(index)
    .get('eventMaintenance');
  }

  overhaulMaintenances(): FormArray {
    return this.form.get('overhaulMaintenances') as FormArray;
  }

  labors(index:any): FormArray {
    return this.events()
    .at(index)
    .get('eventLabours') as FormArray;
  }

  overhaulLabors(): FormArray {
    return this.form.get('overhaulLabors') as FormArray;
  }

  conts(index:any): FormArray {
    return this.events()
    .at(index)
    .get('eventContractors') as FormArray;
  }

  overhaulConts(): FormArray {
    return this.form.get('overhaulConts') as FormArray;
  }

  newEvent() {
    return this.fb.group({
      eventTitle: '',
      eventOccurence:'',
      eventStretch: '',
      eventMaintenance:this.fb.array([]),
      eventLabours:this.fb.array([]),
      eventContractors: this.fb.array([])
    });
  }

  newMaintenance() {
    return this.fb.group({
      evMaintenance: '',
      evCost: '',
    });
  }

  newOverhaulMaintenance() {
    return this.fb.group({
      ohMaintenance: '',
      ohCost: '',
    });
  }

  newLabor(): FormGroup {
    return this.fb.group({
      evLabour: '',
      evHour: '',
    });
  }

  newOverhaulLabor(): FormGroup {
    return this.fb.group({
      ohLabour: '',
      ohHour: '',
    });
  }

  newCont() {
    return this.fb.group({
      evContractor: '',
      evCost: '',
    });
  }

  newOverhaulCont() {
    return this.fb.group({
      ohLabour:"",
      ohHour: ''
    });
  }

  addEvent() {
    this.events().push(this.newEvent());
  }

  addMaintenance(index:any) {
    this.maintenances(index).push(this.newMaintenance());
  }

  addOverhaulMaintenance() {
    this.overhaulMaintenances().push(this.newOverhaulMaintenance());
  }

  addLabor(index:any) {
    this.labors(index).push(this.newLabor());
  }

  addOverhaulLabor() {
    this.overhaulLabors().push(this.newOverhaulLabor());
  }

  addCont(index:any) {
    this.conts(index).push(this.newCont());
  }

  addOverhaulCont() {
    this.overhaulConts().push(this.newOverhaulCont());
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
