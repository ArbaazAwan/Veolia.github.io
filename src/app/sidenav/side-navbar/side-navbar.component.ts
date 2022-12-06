import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements OnInit {
  role: any = localStorage.getItem('role');
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  isClientListRoute() {
    return this.router.url === '/clientslist';
  }
}
