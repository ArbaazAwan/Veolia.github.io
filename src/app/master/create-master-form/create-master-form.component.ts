import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-master-form',
  templateUrl: './create-master-form.component.html',
  styleUrls: ['./create-master-form.component.scss']
})
export class CreateMasterFormComponent implements OnInit {

  constructor(private fb:FormBuilder) { }


  form!: FormGroup;
  
  ngOnInit(): void {
    this.form = this.fb.group({
      //building form
      unitDesc: ['',Validators.required],
      appDesc: ['',Validators.required],
      unitMeas: ['',Validators.required],
      rev: ['',Validators.required],
      replCost: ['',Validators.required],
      lifeMOs: ['',Validators.required],
      OHLife: ['',Validators.required],
      maintenances: this.fb.array([]),
      labors: this.fb.array([]),
      conts: this.fb.array([]),
      overhaulMaintenances: this.fb.array([]),
      overhaulLabors: this.fb.array([]),
      overhaulConts: this.fb.array([]),
    });
  }

  maintenances(): FormArray {
    return <FormArray>this.form.get('maintenances');
  }

  overhaulMaintenances(): FormArray {
    return this.form.get('overhaulMaintenances') as FormArray
  }

  labors(): FormArray {
    return this.form.get('labors') as FormArray;
  }

  overhaulLabors(): FormArray {
    return this.form.get('overhaulLabors') as FormArray;
  }

  conts(): FormArray {
    return this.form.get('conts') as FormArray;
  }

  overhaulConts(): FormArray {
    return this.form.get('overhaulConts') as FormArray;
  }

  newMaintenance() {
    return this.fb.group({
      desc: ['',Validators.required],
      cost: ['',Validators.required],
    });
  }

  newOverhaulMaintenance() {
    return this.fb.group({
      desc: ['',Validators.required],
      cost: ['',Validators.required],
    });
  }

  newLabor(): FormGroup {
    return this.fb.group({
      level: ['',Validators.required],
      hrs: ['',Validators.required],
    });
  }

  newOverhaulLabor(): FormGroup {
    return this.fb.group({
      level: ['',Validators.required],
      hrs: ['',Validators.required],
    });
  }

  newCont() {
    return this.fb.group({
      desc: ['',Validators.required],
      cost: ['',Validators.required],
    });
  }

  newOverhaulCont() {
    return this.fb.group({
      desc: ['',Validators.required],
      cost: ['',Validators.required],
    });
  }

  addMaintenance() {
    this.maintenances().push(this.newMaintenance());
  }

  addOverhaulMaintenance() {
    this.overhaulMaintenances().push(this.newOverhaulMaintenance());
  }

  addLabor() {
    this.labors().push(this.newLabor());
  }

  addOverhaulLabor() {
    this.overhaulLabors().push(this.newOverhaulLabor());
  }

  addCont() {
    this.conts().push(this.newCont());
  }

  addOverhaulCont() {
    this.overhaulConts().push(this.newOverhaulCont());
  }

  removeMaintenance(index: number) {
    this.maintenances().removeAt(index);
  }

  removeOverhaulMaintenance(index: number) {
    this.overhaulMaintenances().removeAt(index);
  }

  removeLabor(i: number) {
    this.labors().removeAt(i);
  }

  removeOverhaulLabor(i: number) {
    this.overhaulLabors().removeAt(i);
  }

  removeCont(i: number) {
    this.conts().removeAt(i);
  }

  removeOverhaulCont(i: number) {
    this.overhaulConts().removeAt(i);
  }

}
