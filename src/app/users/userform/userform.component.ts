import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss']
})
export class UserformComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  form!: FormGroup;
  userArray: any[] = [];
  user!: any;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      status: true,
    });
}
submitForm() {
  let formValue = this.form.value;
  this.user = {
    userName: formValue.username,
    userEmail: formValue.email,
    role: formValue.role,
    userStatus:formValue.status
  }
  this.userService.postUser(this.user);
}

formReset() {
  this.form.reset();
}
}

