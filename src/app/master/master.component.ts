import { Component, OnInit } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormGroup } from '@angular/forms';
import { MasterService } from './master.service';


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  form!:FormGroup
  showSideNav:boolean = true;
  assets!:any[];

  constructor(private fb:FormBuilder,private masterService:MasterService) {

  }

  ngOnInit(): void {
   this.assets = this.masterService.loadAssets(); //loading the assets

    this.form = this.fb.group({ 
      //building form
      id:'',
      assetName:'',
      appDesc: '',
      unitMeas:'',
      rev:'',
      unitCode:'',
      appCode:'',
      replCost:'',
      lifeMOs:'',
      OHLife:'',
      maintenances:this.fb.array([]),
      labors:this.fb.array([]),
      conts:this.fb.array([]),
      overhaulMaintenances:this.fb.array([]),
      overhaulLabors:this.fb.array([]),
      overhaulConts:this.fb.array([]),

    });

  }

  maintenances():FormArray
  {
    return <FormArray>this.form.get("maintenances")
  }
  overhaulMaintenances():FormArray
  {
    return <FormArray>this.form.get("overhaulMaintenances")
  }

  labors() : FormArray
  {
    return this.form.get("labors") as FormArray
  }
  overhaulLabors() : FormArray
  {
    return this.form.get("overhaulLabors") as FormArray
  }

  conts() : FormArray
  {
    return this.form.get("conts") as FormArray
  }

  overhaulConts() : FormArray
  {
    return this.form.get("overhaulConts") as FormArray
  }

  newMaintenance()
  {
    return this.fb.group({
      desc: '',
      cost: ''
    })
  }
  newOverhaulMaintenance()
  {
    return this.fb.group({
      desc: '',
      cost: ''
    })
  }

  newLabor(): FormGroup
  {
    return this.fb.group({
      level: '',
      hrs: '',
    })
  }
  newOverhaulLabor(): FormGroup
  {
    return this.fb.group({
      level: '',
      hrs: '',
    })
  }

  newCont()
  {
    return this.fb.group({
      desc: '',
      cost: ''
    })
  }

  newOverhaulCont()
  {
    return this.fb.group({
      desc: '',
      cost: ''
    })
  }

  addMaintenance()
  {
    this.maintenances().push(this.newMaintenance());
  }

  addOverhaulMaintenance()
  {
    this.overhaulMaintenances().push(this.newOverhaulMaintenance());
  }

  addLabor()
  {
    this.labors().push(this.newLabor());
  }

  addOverhaulLabor()
  {
    this.overhaulLabors().push(this.newOverhaulLabor());
  }

  addCont()
  {
    this.conts().push(this.newCont());
  }

  addOverhaulCont()
  {
    this.overhaulConts().push(this.newOverhaulCont());
  }

  removeMaintenance(index:number)
  {
    this.maintenances().removeAt(index);
  }

  removeOverhaulMaintenance(index:number)
  {
    this.overhaulMaintenances().removeAt(index);
  }

  removeLabor(i:number)
  {
    this.labors().removeAt(i);
  }

  removeOverhaulLabor(i:number)
  {
    this.overhaulLabors().removeAt(i);
  }

  removeCont(i:number)
  {
    this.conts().removeAt(i);
  }

  removeOverhaulCont(i:number)
  {
    this.overhaulConts().removeAt(i);
  }

  toggleShowSideNav(){
    this.showSideNav = !this.showSideNav;
  }
  viewAsset(asset:any){
    this.toggleShowSideNav();
    this.masterService.setAsset(asset);
  }

  editAsset(asset:any){
    this.toggleShowSideNav();
  }

  onSubmit(){
    this.masterService.assets.push(this.form.value);
  }

}
