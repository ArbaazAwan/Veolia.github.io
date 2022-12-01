import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from './client.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  constructor(private fb: FormBuilder, private clientService: ClientService) {}
  form!: FormGroup;
  clientsArray: any[] = [];
  title: string = 'Clients';
  isLoading: boolean = false;
  clients: any[] = [];
  error: any = {};
  currentClient: any = {};
  isEditFormLoading: boolean = true;

  ngOnInit(): void {
    this.form = this.fb.group({
      clientName: ['', Validators.required],
      contractYears: ['', Validators.required],
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
        window.location.reload();
      },
      error: (err: any) => {
        window.location.reload();
        this.error = err;
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
      });

      this.isEditFormLoading = false;
    });
  }

  onUpdateClient() {
    if (this.currentClient.clientId) {
      this.isLoading = true;
      this.clientService
        .updateClient(this.currentClient, this.form.value)
        .subscribe({
          next: (_) => window.location.reload(),
          error: (err) => {
            window.location.reload();
            this.error = err;
          },
        });
    }
  }

  onDeleteClient(id: any) {
    this.clients = this.clients.filter(({ clientId }) => clientId != id);

    this.clientService.deleteClient(id);
    
  }
}
