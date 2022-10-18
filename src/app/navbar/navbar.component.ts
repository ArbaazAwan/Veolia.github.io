import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  @Input() title:string='';

  selectedClient: any={
    name:''
  };
  clients!:any[];
  selectedSite:any={
    name:''
  };
  sites!:any[];
  filteredSites:any[]=[];
  filteredClients:any[]=[];
  keyword:string='name'
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
    ];
  }

  selectEvent(item:any) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e:any) {
    // do something
  }
  onClientSelect(selectedClient:any){

  }

  onSiteSelect(selectedClient:any){

  }


}
