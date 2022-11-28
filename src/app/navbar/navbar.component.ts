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
    private authService: AuthService
  ) {}

  isLoadingClient: boolean = false;
  isLoadingSite: boolean = false;

  selectedClient: any;
  selectedSite: any;

  clients!: any[];
  sites!: any[];
  filteredSites: any[] = [];
  filteredClients: any[] = [];

  keyword: string = 'name';

  ngOnInit(): void {
    this.populateClients();
    this.selectedClient = localStorage.getItem('clientId');
    this.selectedSite = localStorage.getItem('siteId');
    if (this.selectedClient) {
      this.populateSites(this.selectedClient);
    }
  }

  populateClients() {
    this.isLoadingClient = true;
    this.clientService.getClients().subscribe((res: any) => {
      this.clients = res;
      this.isLoadingClient = false;
    });
  }

  populateSites(client: any) {
    this.isLoadingSite = true;
    this.siteService.getSiteByClientId(client).subscribe((res: any) => {
      this.sites = res;
      this.isLoadingSite = false;
    });
  }

  onClientSelect(selectedClient: any) {
    localStorage.setItem('clientId', selectedClient.value);
  }

  onSiteSelect(selectedClient: any) {
    localStorage.setItem('siteId', selectedClient.value);
    window.location.reload();
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
