import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  settingFlag:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  settingToggle(){
    this.settingFlag = !this.settingFlag;
  }

}
