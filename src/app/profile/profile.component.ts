import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef;
  form!: FormGroup;
  user: any = {};
  email?: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  pForm: FormGroup = this.fb.group({
    password: [null, Validators.compose([Validators.required, this.patternValidator()]),],
    confirmPassword: [null, Validators.compose([Validators.required, this.patternValidator()]),]
  });
  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.email = localStorage.getItem('user_email')?.toString();
    this.getUser();
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  initializeForm() {
    this.form = this.fb.group({
      username: [{ value: null, disabled: true }, Validators.required],
      email: [null, Validators.required],
      role: [{ value: null, disabled: true }, Validators.required],
    });
  }

  async getUser() {
    this.isLoading = true;
    await this.userService.getUserByEmail(this.email).subscribe((res: any) => {
      this.user = res[0];
      this.form.setValue({
        username: this.user.userName,
        email: this.user.userEmail,
        role: this.user.role,
      });
      this.isLoading = false;
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

  modalClose() {
    this.closeModal.nativeElement.click();
  }

  resetForm() {
    this.pForm.reset();
    this.showPassword = false;
    this.showConfirmPassword = false;
  }

  submitPassword() {
    let pf = this.pForm.value;
    if (pf.password !== pf.confirmPassword) {
      this.userService.openSnackBar(
        'Password and confirm Password do not match.',
        'close'
      );
      this.validateAllFormFields(this.pForm);
      return;
    }

    this.modalClose();

    const PasswordPayload = {
      username: this.user.userName,
      password: pf.password,
    };

    this.userService
      .changeUserPassword(PasswordPayload)
      .subscribe({
        next: (_) => {
          this.userService.openSnackBar(
            'Password is Updated Successfully!',
            'close'
          );
        },
        error: () => {
          this.userService.openSnackBar(
            'Changing Password Failed',
            'close'
          );
        }
      });
  }

  async updateUser() {
    await this.userService
      .updateUser(this.user.userId, this.form.getRawValue())
      .subscribe();
    await this.getUser();
  }
}
