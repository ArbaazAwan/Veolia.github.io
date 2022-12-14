import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {


  constructor(private formBuilder:FormBuilder) { }

  form!:FormGroup;
  dropDownArray:any[] = [];
  
  ngOnInit(): void {
      this.form = this.formBuilder.group({
      assetType:['',Validators.required],
      size:['',Validators.required],
      duty_Application:['',Validators.required],
      quality:['',Validators.required],

    })
  }

  submitForm(){
    this.dropDownArray.push(this.form.value);

  }
}
