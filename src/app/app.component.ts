import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private bnIdle: BnNgIdleService, private router: Router) {}
  title = 'veolia-angular';

  ngOnInit(): void {
    this.bnIdle.startWatching(2600).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        localStorage.removeItem('clientId');
        localStorage.removeItem('siteId');
        localStorage.removeItem('user_email');
        localStorage.removeItem('login_auth');
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }
}
