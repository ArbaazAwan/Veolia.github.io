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
  title:string='Master';
  form!: FormGroup;
  eventEvalTableShow: boolean = false;
  masters: any[] = [];
  currentMaster: any = {};
  isLoading: boolean = false;
  isEditFormLoading: boolean = true;
  error: any = {};
  viewMaster:any;

  constructor(private fb: FormBuilder, private masterService: MasterService) {}

  ngOnInit(): void {

    this.form = this.fb.group({

      oldAssetType: ['',Validators.required],
      newAssetType: ['',Validators.required],
      masterStyle: ['',Validators.required],
      masterSize: ['',Validators.required],
      oldDescription: ['',Validators.required],
      newDescription: ['',Validators.required],
      unitMeasurement: ['',Validators.required],
      rev: ['',Validators.required],
      replacementCost: ['',Validators.required],
      lifeMonths: ['',Validators.required],
      overhaulLife: ['',Validators.required],
    });

    this.getMasters();
  }

  getMasters() {
    this.isLoading = true;
    this.masterService.getMasters().subscribe((res: any) => {
      this.masters = res;
      this.isLoading = false;
    });
  }

  // maintenances(): FormArray {
  //   return <FormArray>this.form.get('maintenances');
  // }

  // overhaulMaintenances(): FormArray {
  //   return this.form.get('overhaulMaintenances') as FormArray
  // }

  // labors(): FormArray {
  //   return this.form.get('labors') as FormArray;
  // }

  // overhaulLabors(): FormArray {
  //   return this.form.get('overhaulLabors') as FormArray;
  // }

  // conts(): FormArray {
  //   return this.form.get('conts') as FormArray;
  // }

  // overhaulConts(): FormArray {
  //   return this.form.get('overhaulConts') as FormArray;
  // }

  // newMaintenance() {
  //   return this.fb.group({
  //     desc: ['',Validators.required],
  //     cost: ['',Validators.required],
  //   });
  // }

  // newOverhaulMaintenance() {
  //   return this.fb.group({
  //     desc: ['',Validators.required],
  //     cost: ['',Validators.required],
  //   });
  // }

  // newLabor(): FormGroup {
  //   return this.fb.group({
  //     level: ['',Validators.required],
  //     hrs: ['',Validators.required],
  //   });
  // }

  // newOverhaulLabor(): FormGroup {
  //   return this.fb.group({
  //     level: ['',Validators.required],
  //     hrs: ['',Validators.required],
  //   });
  // }

  // newCont() {
  //   return this.fb.group({
  //     desc: ['',Validators.required],
  //     cost: ['',Validators.required],
  //   });
  // }

  // newOverhaulCont() {
  //   return this.fb.group({
  //     desc: ['',Validators.required],
  //     cost: ['',Validators.required],
  //   });
  // }

  // addMaintenance() {
  //   this.maintenances().push(this.newMaintenance());
  // }

  // addOverhaulMaintenance() {
  //   this.overhaulMaintenances().push(this.newOverhaulMaintenance());
  // }

  // addLabor() {
  //   this.labors().push(this.newLabor());
  // }

  // addOverhaulLabor() {
  //   this.overhaulLabors().push(this.newOverhaulLabor());
  // }

  // addCont() {
  //   this.conts().push(this.newCont());
  // }

  // addOverhaulCont() {
  //   this.overhaulConts().push(this.newOverhaulCont());
  // }

  // removeMaintenance(index: number) {
  //   this.maintenances().removeAt(index);
  // }

  // removeOverhaulMaintenance(index: number) {
  //   this.overhaulMaintenances().removeAt(index);
  // }

  // removeLabor(i: number) {
  //   this.labors().removeAt(i);
  // }

  // removeOverhaulLabor(i: number) {
  //   this.overhaulLabors().removeAt(i);
  // }

  // removeCont(i: number) {
  //   this.conts().removeAt(i);
  // }

  // removeOverhaulCont(i: number) {
  //   this.overhaulConts().removeAt(i);
  // }

  resetForm() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.invalid) return alert('invalid form');
    const masterID = localStorage.getItem('masterId');
    this.masterService.postMaster(this.form.value).subscribe({
      next: (_) => this.getMasters(),
      error: (e) => {
        this.error = e;
        this.getMasters();
      },
    });
    this.resetForm();
  }

  onEditMaster(id: any) {
    this.isEditFormLoading = true;

    this.masterService.getMasterById(id).subscribe((el: any) => {
      const [_master] = el;

      this.currentMaster = _master;
      console.log(_master);
      this.form = this.fb.group({
        masterName: [_master, Validators.required],
      });

      this.isEditFormLoading = false;
    });
  }
  onViewMaster(id:any){

    this.masterService.getMasterById(id).subscribe((el: any) => {
      this.viewMaster = el[0]
    });
  }

  onUpdateMaster() {
    if (this.currentMaster.masterId) {
      this.isLoading = true;
      this.masterService.updateMaster(this.currentMaster, this.form.value).subscribe({
        next: (_) => {
          this.getMasters();
        },
        error: (err) => {
          this.getMasters();
          this.error = err;
        },
      });
    }
  }

  onDeleteMaster(id: any) {
    this.masters = this.masters.filter(({ masterId }) => masterId != id);
    this.masterService.deleteMaster(id);
  }

}
