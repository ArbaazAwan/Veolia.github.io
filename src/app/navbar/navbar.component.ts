import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ClientService } from '../clients/client.service';
import { SiteService } from '../sites/site.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private clientService: ClientService,
    private siteService: SiteService,
    private authService:AuthService
  ) {}

  isLoadingClient: boolean = false;
  isLoadingSite: boolean = false;

  selectedClientId: any = localStorage.getItem('clientId');
  selectedSiteId: any = localStorage.getItem('siteId');


  clients!: any[];
  sites!: any[];
  filteredSites: any[] = [];
  filteredClients: any[] = [];

  keyword: string = 'name';

  ngOnInit(): void {
    this.populateClients();
    this.selectedClientId = localStorage.getItem('clientId');
    this.selectedSiteId = localStorage.getItem('siteId');
    if(this.selectedClientId)
    this.populateSites(this.selectedClientId);
  }

  populateClients() {
    this.isLoadingClient = true;
    this.clientService.getClients().subscribe((res: any) => {
      this.clients = res;
      this.isLoadingClient = false;
    });
  }

  populateSites(clientId: any) {
    this.isLoadingSite = true;
    this.siteService.getSiteByClientId(clientId).subscribe((res: any) => {
      this.sites = res;
      this.isLoadingSite = false;
    });
  }

  onClientSelect(selectedClientId: any) {
    localStorage.setItem('clientId', selectedClientId.value);
    this.populateSites(selectedClientId.value);
  }

  onSiteSelect(selectedClientId: any) {
    localStorage.setItem('siteId', selectedClientId.value);
    window.location.reload();
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
