import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})
export class SiteFormComponent implements OnInit {

  @Input() sitesArray!:any[];
  constructor(private fb:FormBuilder) { }

  form!:FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      siteName:['', Validators.required],
      siteCompanyName:['', Validators.required],
      siteAddress:['', Validators.required],
      siteEmail:['', Validators.required],
    })
  }

  resetForm(){
    this.form.reset();
  }

  onSubmit(){
    this.sitesArray.push(this.form.value);
    this.resetForm();
  }

}
