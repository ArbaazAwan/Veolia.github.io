import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  role: any = localStorage.getItem('role');
  constructor(private router: Router) {}

  ngOnInit(): void {}

  isClientListRoute() {
    return this.router.url === '/clientslist';
  }
}
