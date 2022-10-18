import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  showSideNav:boolean = true;
  form!:FormGroup;
  sitesArray:any[]=[];
  @Input() title:string = 'Sites';

  ngOnInit(): void {
    this.form = this.fb.group({
      siteName:['', Validators.required],
      siteCompanyName:['', Validators.required],
      siteAddress:['', Validators.required],
      siteEmail:['', Validators.required],
    })
  }

  selectedsite: any ={
    id:null,
    name:''
  };
  sites!:any[];
  onsiteSelect(selectedsite:any){

  }
  resetForm(){
    this.form.reset();
  }

  toggleSideNavShow(){
    this.showSideNav = !this.showSideNav;
  }

  onSubmit(){
    this.sitesArray.push(this.form.value);

    this.toggleSideNavShow();
    this.resetForm();
  }

}
