import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  settingFlag:boolean = false;
  @Input() title:string = 'Dashboard';
  constructor() { }

  ngOnInit(): void {
  }
  settingToggle(){
    this.settingFlag = !this.settingFlag;
  }

}
