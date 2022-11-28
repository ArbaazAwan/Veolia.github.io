import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ClientService } from '../clients/client.service';
import { SiteService } from '../sites/site.service';
import { UserService } from '../users/user.service';

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
    private authService: AuthService,
    private userService: UserService
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
    if (localStorage.getItem('role')?.toLocaleLowerCase() == 'user') {
      var email = localStorage.getItem('email');
      this.userService.getUserByEmail(email).subscribe((users: any) => {
        let userId: string = users[0].userId;
        this.userService.getClientsByUserId(userId).subscribe({
          next: (response: any) => {
            console.log(response);
            this.clients = response.userClients;
            this.isLoadingClient = false;
          },
          error: (error) => {
            this.isLoadingClient = false;
          },
        });
      });
    } else {
      this.clientService.getClients().subscribe((res: any) => {
        this.clients = res;
        this.isLoadingClient = false;
      });
    }
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
