import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-table',
  templateUrl: './dropdown-table.component.html',
  styleUrls: ['./dropdown-table.component.scss']
})
export class DropdownTableComponent implements OnInit {

  constructor() { }
  @Input() dropDownArray!:any[]

  ngOnInit(): void {
  }

}
