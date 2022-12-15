import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteService } from '../sites/site.service';
import { UserService } from '../users/user.service';
import { ClientService } from './client.service';

type ClientType = 'true' | 'false';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private userService: UserService,
    private siteService: SiteService
  ) { }
  form: FormGroup = this.fb.group({
    clientName: '',
    clientStatus: '',
    contractYears: ''
  })
  clientsArray: any[] = [];
  title: string = 'Clients';
  isLoading: boolean = false;
  clients: any[] = [];
  error: any = {};
  currentClient: any = {};
  isEditFormLoading: boolean = true;
  clientStatus: ClientType;
  clientId = localStorage.getItem('clientId');
  siteStatus: boolean = false;

  ngOnInit(): void {
    // this.onUpdateClient()
    if (
      !localStorage.getItem('firstReload') ||
      localStorage.getItem('firstReload') == 'true'
    ) {
      localStorage.setItem('firstReload', 'false');
      window.location.reload();
    } else {
      localStorage.setItem('firstReload', 'true');
    }
    this.form = this.fb.group({
      clientName: ['', Validators.required],
      contractYears: ['', Validators.required],
      clientStatus: ['', Validators.required],
    });

    this.getClient();
  }

  selectedClient: any = {
    id: null,
    name: '',
  };

  resetForm() {
    this.form.reset();
  }

  getClient() {
    this.isLoading = true;
    this.clientService.getClients().subscribe((res: any) => {
      this.clients = res;
      this.isLoading = false;
    });
  }

  onSubmit() {
    this.clientsArray.push(this.form.value);

    this.clientService.postClient(this.form.value).subscribe({
      next: (_) => {
        this.userService.openSnackBar(
          'New Client is Created Successfully!',
          'close'
        );
        this.getClient();
      },
      error: (err: any) => {
        this.error = err.message;
        this.userService.openSnackBar(this.error, 'close');
      },
    });

    this.resetForm();
  }

  onClearForm() {
    this.resetForm();
  }

  onEditClient(id: any) {
    this.isEditFormLoading = true;

    this.clientService.getClientById(id).subscribe((el: any) => {
      const [_client] = el;

      this.currentClient = _client;
      this.form = this.fb.group({
        clientName: [_client.clientName, Validators.required],
        contractYears: [_client.contractYears, Validators.required],
        clientStatus: [_client.clientStatus, Validators.required],
      });

      this.isEditFormLoading = false;
    });
  }

  onUpdateClient() {
    if (this.form.value.clientStatus===false) {
      console.log("form status of client",this.form.value.clientStatus)
      this.siteService.getSiteByClientId(this.clientId).subscribe(
        (sites: any) => {
          console.log("response of sites",sites)
          sites.forEach((site: any) => {
            let data = {
              siteName: site.siteName,
              siteStatus: false
            }
            this.siteService.updateSite(site.siteId, data).subscribe(
              (res: any) => {
                console.log(res.message);
              }
            )
          });
        }
      )
    }

    

    if (this.currentClient.clientId) {
      this.isLoading = true;
      this.clientService
        .updateClient(this.currentClient, this.form.value)
        .subscribe({
          next: (_) => {
            this.userService.openSnackBar(
              'Client is Updated Successfully!',
              'close'
            );
            this.getClient();
          },
          error: (err) => {
            this.error = err.message;
            this.userService.openSnackBar(this.error, 'close');
            this.getClient();
          },
        });
    }
  }

  onDeleteClient(id: any) {
    this.siteService.getSiteByClientId(id).subscribe((res: any) => {
      let sitesCount = res.length;
      if (sitesCount > 0) {
        this.userService.openSnackBar(
          'The client cannot be deleted until all the associated Sites are deleted or detached from the Client.',
          'close'
        );
      } else {
        this.clients = this.clients.filter(({ clientId }) => clientId != id);
        this.clientService.deleteClient(id);
        this.userService.openSnackBar(
          'Client Record Deleted Successfully!',
          'close'
        );
      }
    });
  }
}
