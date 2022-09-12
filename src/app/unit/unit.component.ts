import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {


  constructor(private fb:FormBuilder) {
    this.form = this.fb.group({
      items: this.fb.array([]),
      labors:this.fb.array([]),
      shop_Contractors:this.fb.array([])
    });

   }

  form!:FormGroup;
  unitArray:any[] = [];

  ngOnInit(): void {
    //   this.form = this.fb.group({
    //   assetType:['',Validators.required],
    //   size:['',Validators.required],
    //   duty_Application:['',Validators.required],
    //   quality:['',Validators.required],

    // })
  }



  items() : FormArray {
    return this.form.get("items") as FormArray
  }
  labors() : FormArray {
    return this.form.get("labors") as FormArray
  }
  shop_Contractors() : FormArray {
    return this.form.get("shop_Contractors") as FormArray
  }

  newItem(): FormGroup {
    return this.fb.group({
      item: '',
      cost: '',
    })
  }
  newLabor(): FormGroup {
    return this.fb.group({
      level: '',
      hrs: '',
    })
  }
  newShop_Contractor(): FormGroup {
    return this.fb.group({
      desc: '',
      cost: '',
    })
  }

  addItem() {
    this.items().push(this.newItem());
  }
  addLabor() {
    this.labors().push(this.newLabor());
  }
  addShop_Contractor() {
    this.shop_Contractors().push(this.newShop_Contractor());
  }

  removeItem(i:number) {
    this.items().removeAt(i);
  }
  removeLabor(i:number) {
    this.labors().removeAt(i);
  }
  removeShop_Contractor(i:number) {
    this.shop_Contractors().removeAt(i);
  }


  onSubmit(){
    this.unitArray.push(this.form.value);

  }
}
