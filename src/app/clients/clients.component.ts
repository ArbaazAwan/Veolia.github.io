import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SiteService } from '../sites/site.service';
import { UserService } from '../users/user.service';
import { ClientService } from './client.service';
import { Router } from '@angular/router';

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
    private siteService: SiteService,
    private router: Router
  ) {}

  form: FormGroup = this.fb.group({
    clientName: [
      null,
      [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
    ],
    contractYears: [
      null,
      [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
    ],
    clientStatus: [null],
  });
  clientsArray: any[] = [];
  title: string = 'Clients';
  isLoading: boolean = false;
  clients: any[] = [];
  error: any = {};
  currentClient: any = {};
  isEditFormLoading: boolean = false;
  clientStatus: boolean = false;
  clientId = localStorage.getItem('clientId');
  siteStatus: boolean = false;
  isEditForm: boolean = false;

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

    this.getClients();
    this.checkUserRole();
  }

  selectedClient: any = {
    id: null,
    name: '',
  };

  checkUserRole() {
    var userRole = localStorage.getItem('role');
    if (userRole != 'admin') {
      this.router.navigate(['/clientslist']);
    }
  }

  resetForm() {
    this.form.reset();
  }

  getClients() {
    this.isLoading = true;
    this.clientService.getClients().subscribe((res: any) => {
      this.clients = res;
      this.isLoading = false;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.currentClient.clientId) {
        this.UpdateClient();
      } else {
        this.clientsArray.push(this.form.value);

        this.clientService.postClient(this.form.value).subscribe({
          next: (_) => {
            this.userService.openSnackBar(
              'New Client is Created Successfully!',
              'Close'
            );
            this.getClients();
          },
          error: (err: any) => {
            if (this.form.valid) {
              this.error = err.message;
              this.userService.openSnackBar(this.error, 'close');
            }
            this.userService.openSnackBar(
              'Form not valid. Please populate all fields',
              'Close'
            );
          },
        });

        this.resetForm();
      }
    } else {
      this.validateAllFormFields(this.form);
    }
    this.resetForm();
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup)
        this.validateAllFormFields(control);
    });
  }

  onEditClient(id: any) {
    this.isEditForm = true;
    this.isEditFormLoading = true;

    this.clientService.getClientById(id).subscribe((el: any) => {
      const [_client] = el;
      this.currentClient = _client;
      let c = this.form.controls;
      c['clientName'].setValue(_client.clientName);
      c['contractYears'].setValue(_client.contractYears);
      c['clientStatus'].setValue(_client.clientStatus);

      this.isEditFormLoading = false;
    });
  }

  UpdateClient() {
    if (this.form.value.clientStatus === false) {
      this.siteService
        .getSiteByClientId(this.clientId)
        .subscribe((sites: any) => {
          sites.forEach((site: any) => {
            let data = {
              siteName: site.siteName,
              siteStatus: false,
            };
            this.siteService
              .updateSite(site.siteId, data)
              .subscribe((res: any) => {
                console.log(res.message);
              });
          });
        });
    }

    this.isLoading = true;
    this.clientService
      .updateClient(this.currentClient, this.form.value)
      .subscribe({
        next: (_) => {
          this.userService.openSnackBar(
            'Client is Updated Successfully!',
            'Close'
          );
          this.getClients();
        },
        error: (err) => {
          this.error = err.message;
          this.userService.openSnackBar(this.error, 'close');
          this.getClients();
        },
      });
  }

  onCreate() {
    this.isEditForm = false;
  }

  onDeleteClient(id: any) {
    this.siteService.getSiteByClientId(id).subscribe((res: any) => {
      let sitesCount = res.length;
      if (sitesCount > 0) {
        this.userService.openSnackBar(
          'The client cannot be deleted until all the associated Sites are deleted or detached from the Client.',
          'Close'
        );
      } else {
        this.clients = this.clients.filter(({ clientId }) => clientId != id);
        this.clientService.deleteClient(id);
        this.userService.openSnackBar(
          'Client Record Deleted Successfully!',
          'Close'
        );
      }
    });
  }
}
