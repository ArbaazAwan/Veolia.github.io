import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

type UserType = 'admin' | 'user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild('closePModal') closePModal: ElementRef;
  form: FormGroup = this.formBuilder.group({
    username: [null, [Validators.required, Validators.pattern(/^\S*$/)]],
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      Validators.compose([Validators.required, this.patternValidator()]),
    ],
  });
  pForm: FormGroup = this.formBuilder.group({
    username: [
      {
        value: '',
        disabled: true,
      },
    ],
    password: [null, Validators.compose([Validators.required, this.patternValidator()]),],
    confirmPassword: [null, Validators.compose([Validators.required, this.patternValidator()]),]
  });
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
  isLoadingPassword: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  users: any[] = [];
  error: any = {};
  currentUser: any = {};
  isEditFormLoading: boolean = true;
  searchText: string = '';
  role: UserType = 'user';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkUserRole();
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
      username: [null, [Validators.required, Validators.pattern(/^\S*$/)]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        Validators.compose([Validators.required, this.patternValidator()]),
      ],
    });
    this.pForm = this.formBuilder.group(
      {
        username: [
          {
            value: '',
            disabled: true,
          },
        ],
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

  get pf() {
    return this.pForm.getRawValue();
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe((res: any) => {
      this.users = res;
      this.isLoading = false;
    });
  }

  closePasswordModal() {
    this.closePModal.nativeElement.click();
  }

  submitPassword() {
    if (this.pf.password !== this.pf.confirmPassword) {
      this.userService.openSnackBar(
        'Password and confirm Password do not match.',
        'close'
      );
      this.validateAllFormFields(this.pForm);
      return;
    }

    this.closePasswordModal();

    const PasswordPayload = {
      username: this.currentUser.userName,
      password: this.pf.password,
    };

    this.userService
      .changeUserPassword(PasswordPayload)
      .subscribe((res: any) => {
        this.userService.openSnackBar(
          'Password is Updated Successfully!',
          'close'
        );
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
        this.userService.openSnackBar(
          'New User is Created Successfully!',
          'close'
        );
        this.getUsers();
      },
      error: (err) => {
        this.error = err.message;
        this.userService.openSnackBar(
          'Username & Email ID already exists or values are not entered correctly',
          'Close'
        );
        this.getUsers();
      },
    });
    this.formReset();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onChangePassword(id: any) {
    this.isLoadingPassword = true;
    this.userService.getUserById(id).subscribe((el: any) => {
      const [_user] = el;
      this.currentUser = _user;
      this.pForm.get('username')?.setValue(_user.userName);
      this.isLoadingPassword = false;
    });
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup)
        this.validateAllFormFields(control);
    });
  }

  formReset() {
    this.form.reset();
    this.pForm.reset();
  }

  onDeleteUser(user: any) {
    this.users = this.users.filter(({ userId }) => userId != user.userId);
    this.userService.deleteUser(user.userId, user.userName);
    this.userService.openSnackBar(
      'User Record is Deleted Successfully!',
      'Close'
    );
  }

  onEditUser(id: any) {
    this.isEditFormLoading = true;

    this.userService.getUserById(id).subscribe((el: any) => {
      const [_user] = el;

      this.currentUser = _user;
      this.form.get('username')?.setValue(_user.userName);
      this.form.get('username')?.disable();
      this.form.get('email')?.setValue(_user.userEmail);
      this.form.get('role')?.setValue(_user.role);
      this.form.get('password')?.setValue(_user.password);
      this.form.get('password')?.disable();

      this.role = _user.role.toLowerCase();

      this.isEditFormLoading = false;
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
          next: (res: any) => {
            this.userService.openSnackBar(res.message, 'close');
            this.getUsers();
          },
          error: (err) => {
            this.userService.openSnackBar(err.error.message.message, 'close');
            this.getUsers();
          },
        });
    }

    this.initializeForm();
  }

  checkUserRole() {
    var userRole = localStorage.getItem('role');
    if (userRole != 'admin' && userRole != 'power_user') {
      this.router.navigate(['/clientslist']);
    }
  }
}
