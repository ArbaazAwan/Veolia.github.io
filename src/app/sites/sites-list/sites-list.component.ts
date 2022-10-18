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
        address:'abc street xyz city',
        siteClient:'Client1',
        siteContactPerson:'ABC',
        phone:'123456',
        email:'abc@xyz.com'
      },
      {
        siteName:'Site 2',
        address:'abc street xyz city',
        siteClient:'Client1',
        siteContactPerson:'BCD',
        phone:'123456',
        email:'abc@xyz.com'
      },
      {
        siteName:'Site 3',
        address:'abc street xyz city',
        siteClient:'Client1',
        siteContactPerson:'CDE',
        phone:'123456',
        email:'abc@xyz.com'
      }
    ]
  }

}
