import { Component, OnInit } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  form!:FormGroup
  showSideNav:boolean = true;

  constructor(private fb:FormBuilder) {

   }

  ngOnInit(): void {
    this.form = this.fb.group({
      unitDesc:'',
      appDesc: '',
      unitMeas:'',
      rev:'',
      unitCode:'',
      appCode:'',
      replCost:'',
      lifeMOs:'',
      OHLife:'',
      event:'',
      maintenances:this.fb.array([]),
      labors:this.fb.array([]),
      costs:this.fb.array([])
    })
  }

  maintenances():FormArray
  {
    return <FormArray>this.form.get("maintenances")
  }

  labors() : FormArray
  {
    return this.form.get("labors") as FormArray
  }

  costs() : FormArray
  {
    return this.form.get("costs") as FormArray
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

  newCost()
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

  addCost()
  {
    this.costs().push(this.newCost());
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
    this.costs().removeAt(i);
  }

  toggleShowSideNav(){
    this.showSideNav = !this.showSideNav;
  }

  onSubmit(){

  }

}
