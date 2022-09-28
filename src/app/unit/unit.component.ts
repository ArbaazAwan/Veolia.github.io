import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {

  constructor(private fb:FormBuilder) {}

  form!:FormGroup;
  unitArray:any[] = [];
  showSideNav:boolean= true;

  ngOnInit(): void {
    this.form = this.fb.group({
      maintanance:['',Validators.required],
      description:['', Validators.required],
      performEveryMOs:['',Validators.required],
      strechForPartialLoading:['',Validators.required],
      items: this.fb.array([]),
      labors:this.fb.array([]),
      shop_Contractors:this.fb.array([]),
    });
  }

  items() : FormArray
  {
    return this.form.get("items") as FormArray
  }

  labors() : FormArray
  {
    return this.form.get("labors") as FormArray
  }

  shop_Contractors() : FormArray
  {
    return this.form.get("shop_Contractors") as FormArray
  }

  newItem(): FormGroup
  {
    return this.fb.group({
      item: '',
      cost: '',
    })
  }
  newLabor(): FormGroup
  {
    return this.fb.group({
      level: '',
      hrs: '',
    })
  }

  newShop_Contractor(): FormGroup
  {
    return this.fb.group({
      desc: '',
      cost: '',
    })
  }

  addItem()
  {
    this.items().push(this.newItem());
  }
  addLabor()
  {
    this.labors().push(this.newLabor());
  }
  addShop_Contractor()
  {
    this.shop_Contractors().push(this.newShop_Contractor());
  }

  removeItem(i:number)
  {
    this.items().removeAt(i);
  }
  removeLabor(i:number)
  {
    this.labors().removeAt(i);
  }
  removeShop_Contractor(i:number)
  {
    this.shop_Contractors().removeAt(i);
  }

  toggleSideNavShow(){
    this.showSideNav = !this.showSideNav;
  }

  onSubmit()
  {
    this.unitArray.push(this.form.value);
  }
}
