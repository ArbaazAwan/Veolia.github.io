import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private userService:UserService) { }

  form!:FormGroup
  userArray:any[]=[];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      role: ['',Validators.required],
      status: ['',Validators.required],
    });

  }

  submitForm(){
    // this.userArray.push(this.form.value);
    this.userService.getUsers(); //just to check values
  }

  formReset(){
    this.form.reset();
  }

}
