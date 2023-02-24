import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/users/user.service';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private mainService: MainService,
  ) { }

  form!: FormGroup;
  isLoading: boolean = false;
  hasError: boolean = false;
  showPassword: boolean = false;
  userData: any;

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
        {
          next: (response: any) => {
            sessionStorage.setItem('login_auth', response.token);
            this.mainService.setToken(response.token);
            localStorage.setItem('user_email', this.form.value.email);
            this.userService.getUserByEmail(this.form.value.email).subscribe({
              next: (response: any) => {
                localStorage.setItem('role', response[0].role.toLowerCase());
                localStorage.setItem('user_name', response[0].userName.toLowerCase());
                this.router.navigate(['/clientslist']);
              },
              error: (error) => {
                console.log(error);
              },
            });
          },
          error: (error: any) => {
            this.isLoading = false;
            this.hasError = true;
          }
        }
      );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
