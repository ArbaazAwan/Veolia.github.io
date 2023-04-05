import { Component, HostListener } from '@angular/core';
import { AuthService } from './auth/auth.service'
import { UserService } from './users/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  title = 'veolia-angular';

  ngOnInit(): void {}

  timeout: any;
  @HostListener('window:mousemove')
  @HostListener('window:keydown')
  @HostListener('window:click')
  resetTimeout() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.userService.openSnackBar('The system will automatically log you out after 5 minutes due to inactivity.','close')
        setTimeout(()=>{
          this.authService.logout();
        },300000) // 5 minutes
    }, 2700000); // 45 minutes
  }
}
