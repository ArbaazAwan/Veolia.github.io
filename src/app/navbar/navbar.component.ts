import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  selectedClient: any;
  clients!:any[];
  selectedSite:any;
  sites!:any[];

  ngOnInit(): void {
    this.clients= [
      { name: "Client 1"},
      { name: "Client 2"},
      { name: "Client 3"},
      { name: "Client 4"},
    ];
    this.sites = [
      { name: "Site 1" },
      { name: "Site 2" },
      { name: "Site 3" },
      { name: "Site 4" },
      { name: "Site 5" },
    ]
  }
  onClientSelect(selectedClient:any){

  }

  onSiteSelect(selectedClient:any){

  }

}
