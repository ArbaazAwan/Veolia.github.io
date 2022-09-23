import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-unit-table',
  templateUrl: './unit-table.component.html',
  styleUrls: ['./unit-table.component.scss']
})
export class UnitTableComponent implements OnInit {

  constructor() { }

  @Input() unitArray!:any[];

  ngOnInit(): void {
  }

}
