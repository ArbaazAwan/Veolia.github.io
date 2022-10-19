import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  form!:FormGroup
  userArray:any[]=[];
  showSideNav:boolean = true;

  ngOnInit(): void {
    this.form = this.formBuilder.group({

      name: ['',Validators.required],
      email: ['',Validators.required],
      role: ['',Validators.required],
      status: ['',Validators.required],

    })
  }

  toggleSideNavShow(){
    this.showSideNav = !this.showSideNav;
  }
  submitForm(){
    this.userArray.push(this.form.value);
  }

  formReset(){
    this.form.reset();
  }

}
