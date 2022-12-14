import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-clientstable',
  templateUrl: './clientstable.component.html',
  styleUrls: ['./clientstable.component.scss'],
})
export class ClientstableComponent implements OnInit {
  constructor(private clientService: ClientService) {}
  // @Input() clientsArray!:any[];
  p: number = 1;

  searchText: string = '';
  sortedClients: any = [];
  @Input() clients: any = [];
  @Input() isLoading: boolean = false;
  @Output() deleteClientEvent = new EventEmitter();
  @Output() editClientEvent = new EventEmitter();

  ngOnInit(): void {
    this.sortAssets({ active: 'clientId', direction: 'desc' });
  }

  editClient(id: any) {
    this.editClientEvent.emit(id);
  }

  deleteClient(id: any) {
    this.deleteClientEvent.emit(id);
  }

  sortAssets(sort: any) {
    const data = this.clients.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.sortedClients = data.sort((a:any, b:any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'clientId':
          return this.compare(a.clientId, b.clientId, isAsc);
        case 'clientName':
          return this.compare(a.clientName, b.clientName, isAsc);
        case 'contractYears':
          return this.compare(a.contractYears, b.contractYears, isAsc);
        case 'clientCreated':
          return this.compare(a.clientCreated, b.clientCreated, isAsc);
        case 'clientStatus':
          return this.compare(a.clientStatus, b.clientStatus, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean): any {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
