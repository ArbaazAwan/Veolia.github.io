import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.scss']
})
export class SitesListComponent implements OnInit {

  constructor() { }

  sitesList!:any[];

  ngOnInit(): void {
    this.sitesList=[
      {
        siteName:'Site 1',
        desc:'this is the description',
        siteClient:'Client1',
        siteManager:'ABC'
      },
      {
        siteName:'Site 2',
        desc:'this is the description',
        siteClient:'Client1',
        siteManager:'BCD'
      },
      {
        siteName:'Site 3',
        desc:'this is the description',
        siteClient:'Client1',
        siteManager:'CDE'
      }
    ]
  }

}
