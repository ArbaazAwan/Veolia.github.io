import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MasterService } from './master.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  form!: FormGroup;
  showSideNav: boolean = true;
  assets!: any[];
  assetSearchText: string = '';
  sortedAssets!: any[];
  eventEvalTableShow: boolean = false;

  constructor(private fb: FormBuilder, private masterService: MasterService) {}

  ngOnInit(): void {
    this.assets = this.masterService.loadAssets(); //loading the assets

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
    this.sortedAssets = this.assets.slice();
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

  toggleShowSideNav() {
    this.showSideNav = !this.showSideNav;
  }
  viewAsset(asset: any) {
    this.toggleShowSideNav();
    this.masterService.setAsset(asset);
  }

  editAsset(asset: any) {
    this.toggleShowSideNav();
  }

  sortAssets(sort: any) {
    const data = this.assets.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.sortedAssets = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'unitDesc':
          return this.compare(a.unitDesc, b.unitDesc, isAsc);
        case 'appDesc':
          return this.compare(a.appDesc, b.appDesc, isAsc);
        case 'unitMeas':
          return this.compare(a.unitMeas, b.unitMeas, isAsc);
        case 'rev':
          return this.compare(a.rev, b.rev, isAsc);
        case 'unitCode':
          return this.compare(a.unitCode, b.unitCode, isAsc);
        case 'appCode':
          return this.compare(a.appCode, b.appCode, isAsc);
        case 'replCost':
          return this.compare(a.replCost, b.replCost, isAsc);
        case 'lifeMOs':
          return this.compare(a.lifeMOs, b.lifeMOs, isAsc);
        case 'OHLife':
          return this.compare(a.OHLife, b.OHLife, isAsc);

        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean): any {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onSubmit() {
    console.log('this is the form value master:', this.form.value);
    this.masterService.assets.push(this.form.value);
  }
}
