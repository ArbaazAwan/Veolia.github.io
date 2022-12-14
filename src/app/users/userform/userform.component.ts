import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss'],
})
export class UserformComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  form!: FormGroup;
  userArray: any[] = [];

  ngOnInit() {
    if (
      !localStorage.getItem('firstReload') ||
      localStorage.getItem('firstReload') == 'true'
    ) {
      localStorage.setItem('firstReload', 'false');
      window.location.reload();
    } else {
      localStorage.setItem('firstReload', 'true');
    }
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      role: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  submitForm() {
    let user = {
      userName: this.form.value.username,
      userEmail: this.form.value.email,
      role: this.form.value.role,
    };
    this.userService.postUser(user).subscribe((res: any) => {
    });
  }

  formReset() {
    this.form.reset();
  }
}
