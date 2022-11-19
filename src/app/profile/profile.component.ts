import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form!:FormGroup
  user:any={};
  email?:string = '';
  isLoading:boolean = false;
  constructor(private fb:FormBuilder, private userService:UserService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.email =  localStorage.getItem('user_email')?.toString();
    this.getUser();
  }

  initializeForm(){
     this.form = this.fb.group({
      username:[{ value: null, disabled: true }, Validators.required],
      email:[ null, Validators.required],
      role:[{ value: null, disabled: true }, Validators.required]
    })
  }

 async getUser(){
  this.isLoading = true;
     await this.userService.getUserByEmail(this.email).subscribe(
      (res:any)=>{
        this.user = res[0];
        console.log(this.user);
        this.form.setValue({
          username:this.user.userName,
          email:this.user.userEmail,
          role:this.user.role
        });
        this.isLoading = false;
      }
    )
  }

  async updateUser(){

    console.log(this.form.getRawValue());

    await this.userService.updateUser(this.user.userId,this.form.getRawValue()).subscribe();
    await this.getUser()

  }

}
