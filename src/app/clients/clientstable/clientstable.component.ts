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

  searchText: string = '';
  @Input() clients: any[] = [];
  @Input() isLoading: boolean = false;
  @Output() deleteClientEvent = new EventEmitter();
  @Output() editClientEvent = new EventEmitter();

  ngOnInit(): void {}

  editClient(id: any) {
    this.editClientEvent.emit(id);
  }

  deleteClient(id: any) {
    this.deleteClientEvent.emit(id);
  }
}
