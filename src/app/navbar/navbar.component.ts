import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../clients/client.service';
import { SiteService } from '../sites/site.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, private clientService:ClientService, private siteService:SiteService) { }

  isLoadingClient:boolean = false;
  isLoadingSite:boolean = false;

  selectedClient:any={
    clientId:null,
    clientName:null
  }
  selectedSite:any={
    siteId:null,
    siteName:null
  }

  clients!:any[];
  sites!:any[];
  filteredSites:any[]=[];
  filteredClients:any[]=[];

  keyword:string='name'

  ngOnInit(): void {
    this.populateClients();
  }

  async populateClients(){
    this.isLoadingClient = true;
    await this.clientService.getClients().subscribe(
      (res:any)=>{
        this.clients = res;
        this.isLoadingClient = false;
      }
    )
  }

   populateSites(client:any){
    this.isLoadingSite = true;
     this.siteService.getSiteByClientId(client.clientId)
     .subscribe(
      (res:any)=>{
        this.sites = res;
        this.isLoadingSite = false;
      }
     )

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
  logOut(){
    localStorage.removeItem('login_auth');
    this.router.navigate(['/login']);
  }


}
