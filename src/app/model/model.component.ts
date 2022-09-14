import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {


  constructor(private formBuilder:FormBuilder) { }

  form!:FormGroup;
  modelArray:any[] = [];

  ngOnInit(): void {
      this.form = this.formBuilder.group({
      UnitDesc:['',Validators.required],
      AppDesc:['',Validators.required],
      UnitMeas:['',Validators.required],
      Rev:['',Validators.required],
      UnitCode:['',Validators.required],
      AppCode:['',Validators.required],
      ReplCost:['',Validators.required],
      Lifemos:[''],
      OHLife:[''],
      Ev1title:[''],
      Ev1Every:[''],
      Ev1Strch:[''],
      Ev1M1:[''],
      Ev1M1Cst:['']
    })
  }
  submitForm(){
    this.modelArray.push(this.form.value);

  }


}
