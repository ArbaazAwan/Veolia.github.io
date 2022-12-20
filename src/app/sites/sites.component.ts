import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../users/user.service';
import { SiteService } from './site.service';
import { ClientService } from '../clients/client.service';

type SiteType = 'true' | 'false';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  @Input() title: string = 'Sites';

  sitesArray: any[] = [];
  form: FormGroup = this.fb.group({
    siteName: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    selectedClient: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    siteStatus: null
  });
  isLoading: boolean = false;
  sites: any[] = [];
  error: any = {};
  currentSite: any = {};
  isEditFormLoading: boolean = true;
  selectedClientId: number = 1;
  isLoadingClient: boolean = false;
  selectedClient: any;
  clients!: any[];
  siteStatus: SiteType;

  selectedsite: any = {
    id: null,
    name: '',
  };

  constructor(
    private fb: FormBuilder,
    private siteService: SiteService,
    private userService: UserService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    if (
      !localStorage.getItem('firstReload') ||
      localStorage.getItem('firstReload') == 'true'
    ) {
      localStorage.setItem('firstReload', 'false');
      window.location.reload();
    } else {
      localStorage.setItem('firstReload', 'true');
    }

    this.getSites();
    this.selectedClient = localStorage.getItem('clientId');
  }

  getSites() {
    this.isLoading = true;
    this.siteService.getSites().subscribe((res: any) => {
      this.sites = res;
      this.isLoading = false;
    });
  }

  resetForm() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.invalid) return alert('invalid form');
    const clientID = this.form.value.selectedClient;
    this.siteService.postSite(this.form.value.siteName, clientID).subscribe({
      next: (res) => {
        this.userService.openSnackBar(
          'New Site is Created Successfully!',
          'close'
        );
        this.getSites();
      },
      error: (e) => {
        this.error = e.message;
        this.userService.openSnackBar(this.error, 'close');
        this.getSites();
      },
    });
    this.resetForm();
  }

  onEditSite(id: any) {
    this.isEditFormLoading = true;

    this.siteService.getSiteById(id).subscribe((el: any) => {
      const [_site] = el;

      this.currentSite = _site;
      let c =  this.form.controls;
      c['siteName'].setValue(_site.siteName);
      c['siteStatus'].setValue(_site.siteStatus);
      // c['selectedClient'].setValue(_site.selectedClient);

      this.isEditFormLoading = false;
    });
  }

  onUpdateSite() {
    if (this.currentSite.siteId) {
      this.isLoading = true;
      this.siteService
        .updateSite(this.currentSite.siteId, this.form.value)
        .subscribe({
          next: (_) => {
            this.userService.openSnackBar(
              'Site is Updated Successfully!',
              'close'
            );
            this.getSites();
          },
          error: (err) => {
            this.error = err.message;
            this.userService.openSnackBar(this.error, 'close');
            this.getSites();
          },
        });
    }
  }

  onDeleteSite(id: any) {
    this.sites = this.sites.filter(({ siteId }) => siteId != id);
    this.siteService.deleteSite(id);
    this.userService.openSnackBar('The site is deleted successfully', 'close');
  }

  onClientSelect(selectedClient: any) {
    localStorage.setItem('clientId', selectedClient.value);
  }

  populateClients() {
    this.clientService.getClients().subscribe((res: any) => {
      this.clients = res;
    });
  }
}
