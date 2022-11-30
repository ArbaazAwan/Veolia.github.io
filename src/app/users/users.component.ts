import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import Validation from '../utils/validation';
import { UserService } from './user.service';
import { ClientService } from '../clients/client.service';
import { PrimeNGConfig } from 'primeng/api';

type UserType = 'admin' | 'user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  form!: FormGroup;
  pForm!: FormGroup;
  clientsArray: any[] = [];
  allclientIdArr: any[] = [];
  preSelectedClients: any[] = [];
  preSelectedClientsIdArr: any[] = [];
  selectedClients: any[] = [];
  clientIdArr: any[] = [];
  userId: any;
  clientIds: string = '';
  title: string = 'Clients';
  isLoading: boolean = false;
  users: any[] = [];
  error: any = {};
  currentUser: any = {};
  isEditFormLoading: boolean = true;
  searchText: string = '';
  role: UserType = 'user';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private clientService: ClientService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.getUsers();
    this.primengConfig.ripple = true;
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

  get f(): { [key: string]: AbstractControl } {
    return this.pForm.controls;
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
    this.pForm = this.formBuilder.group(
      {
        username: [{
          value: '',
          disabled: true,
        }],
        password: [
          '',
          Validators.compose([Validators.required, this.patternValidator()]),
        ],
        confirmPassword: [
          '',
          Validators.compose([Validators.required, this.patternValidator()]),
        ],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe((res: any) => {
      this.users = res;
      this.isLoading = false;
    });
  }

  submitPassword() {
    if (!this.pForm.value.password == this.pForm.value.confirmPassword) {
      return;
    }

    // this.onChangePassword.

    const PasswordPayload = {
      username: this.currentUser.userName,
      password: this.pForm.value.password,
    };

    this.userService
      .changeUserPassword(PasswordPayload)
      .subscribe((res: any) => {
        console.log(res);
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

  onChangePassword(id: any) {
    this.userService.getUserById(id).subscribe((el: any) => {
      const [_user] = el;

      this.currentUser = _user;

      this.pForm = this.formBuilder.group({
        username: new FormControl({
          value: _user.userName,
          disabled: true,
        }),
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      });
    });
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
    this.pForm.reset();
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
