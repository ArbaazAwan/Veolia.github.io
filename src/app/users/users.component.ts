import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { UserService } from './user.service';

type UserType = 'admin' | 'user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  form!: FormGroup;
  clientsArray: any[] = [];
  title: string = 'Clients';
  isLoading: boolean = false;
  users: any[] = [];
  error: any = {};
  currentUser: any = {};
  isEditFormLoading: boolean = true;
  searchText: string = '';
  role: UserType = 'admin';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getUsers();
  }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const checkSymbol = new RegExp('[^((0-9)|(a-z)|(A-Z)|s)]');
      const valid = regex.test(control.value);
      const checkSymbolValid = checkSymbol.test(control.value);

      return valid && checkSymbolValid ? null : { invalidPassword: true };
    };
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        Validators.compose([Validators.required, this.patternValidator()]),
      ],
    });
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe((res: any) => {
      this.users = res;

      this.isLoading = false;
    });
  }

  submitForm() {
    this.isLoading = true;

    const userPayload = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      role: this.role,
      userStatus: true,
    };

    this.userService.postUser(userPayload).subscribe({
      next: (_: any) => {
        this.getUsers();
      },
      error: (err) => {
        this.getUsers();
        this.error = err;
      },
    });

    this.formReset();
  }

  onUpdateUser() {
    if (this.currentUser.userId) {
      this.isLoading = true;
      const { email } = this.form.value;
      const updatePayload = {
        username: this.currentUser.userName,
        email,
        role: this.role,
        userStatus: this.currentUser.userStatus,
      };

      this.userService
        .updateUser(this.currentUser.userId, updatePayload)
        .subscribe({
          next: (_) => this.getUsers(),
          error: (err) => {
            this.getUsers();
            this.error = err;
          },
        });
    }

    this.initializeForm();
  }

  formReset() {
    this.form.reset();
  }

  onDeleteUser(user: any) {
    this.users = this.users.filter(({ userId }) => userId != user.userId);
    this.userService.deleteUser(user.userId, user.userName);
  }

  onEditUser(id: any) {
    this.isEditFormLoading = true;

    this.userService.getUserById(id).subscribe((el: any) => {
      const [_user] = el;

      this.currentUser = _user;

      this.form = this.formBuilder.group({
        username: new FormControl({
          value: _user.userName,
          disabled: true,
        }),
        email: [_user.userEmail, [Validators.required, Validators.email]],
        role: [_user.role, [Validators.required]],
        password: new FormControl({
          value: _user.password,
          disabled: true,
        }),
      });

      this.role = _user.role.toLowerCase();

      this.isEditFormLoading = false;
    });
  }
}
