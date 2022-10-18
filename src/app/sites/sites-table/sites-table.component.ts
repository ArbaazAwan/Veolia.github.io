import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sites-table',
  templateUrl: './sites-table.component.html',
  styleUrls: ['./sites-table.component.scss']
})
export class SitesTableComponent implements OnInit {

  constructor() { }

  @Input() sitesArray!:any[];
  searchText:string = '';

  ngOnInit(): void {
  }

}
