import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/users/user.service';

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
    private userService: UserService
  ) {}

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
        (response: any) => {
          // localStorage.setItem('login_auth', response.token);
          sessionStorage.setItem('login_auth', response.token);
          localStorage.setItem('user_email', this.form.value.email);
          this.userService.getUserByEmail(this.form.value.email).subscribe({
            next: (response: any) => {
              localStorage.setItem('role', response[0].role.toLowerCase());
              this.router.navigate(['/clientslist']);
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
        (error: any) => {
          this.isLoading = false;
          this.hasError = true;
        }
      );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
