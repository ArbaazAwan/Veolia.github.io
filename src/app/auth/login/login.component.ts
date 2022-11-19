import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  form!: FormGroup;
  isLoading: boolean = false;
  hasError: boolean = false;
  showPassword:boolean = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  login() {
    this.isLoading = true;
    this.authService
      .userLogin(this.form.value.email, this.form.value.password)
      .subscribe(
        (response: any) => {
          localStorage.setItem('login_auth', response.token);
          localStorage.setItem('user_email',this.form.value.email);
          this.router.navigate(['/clientslist']);
        },
        (error: any) => {
          this.isLoading = false;
          this.hasError = true;
        }
      );
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }
}
