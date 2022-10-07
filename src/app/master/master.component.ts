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
  assetSearchText:string='';
  sortedAssets!:any[];

  constructor(private fb:FormBuilder,private masterService:MasterService) {

  }

  ngOnInit(): void {
   this.assets = this.masterService.loadAssets(); //loading the assets

    this.form = this.fb.group({ //building form
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
      conts:this.fb.array([])
    });
    this.sortedAssets = this.assets.slice();

  }

  maintenances():FormArray
  {
    return <FormArray>this.form.get("maintenances")
  }

  labors() : FormArray
  {
    return this.form.get("labors") as FormArray
  }

  conts() : FormArray
  {
    return this.form.get("conts") as FormArray
  }

  newMaintenance()
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

  newCont()
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

  addLabor()
  {
    this.labors().push(this.newLabor());
  }

  addCont()
  {
    this.conts().push(this.newCont());
  }

  removeMaintenance(index:number)
  {
    this.maintenances().removeAt(index);
  }

  removeLabor(i:number)
  {
    this.labors().removeAt(i);
  }

  removeCost(i:number)
  {
    this.conts().removeAt(i);
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

  sortAssets(sort: any) {
    const data = this.assets.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.sortedAssets = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc)
        case 'assetName':
          return this.compare(a.assetName, b.assetName, isAsc)
        case 'appDesc':
          return this.compare(a.appDesc, b.appDesc, isAsc)
        case 'unitMeas':
          return this.compare(a.unitMeas, b.unitMeas, isAsc)
        case 'rev':
          return this.compare(a.rev, b.rev, isAsc)
        case 'unitCode':
          return this.compare(a.unitCode, b.unitCode, isAsc)
        case 'appCode':
          return this.compare(a.appCode, b.appCode, isAsc)
        case 'replCost':
          return this.compare(a.replCost, b.replCost, isAsc)
        case 'lifeMOs':
          return this.compare(a.lifeMOs, b.lifeMOs, isAsc)
        case 'OHLife':
          return this.compare(a.OHLife, b.OHLife, isAsc)

        default:
          return 0;
      }
    });
  }
   compare(a: number | string, b: number | string, isAsc: boolean):any {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onSubmit(){
    this.masterService.assets.push(this.form.value);
  }

}
