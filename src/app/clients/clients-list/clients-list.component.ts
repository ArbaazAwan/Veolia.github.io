import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  constructor(private clientService:ClientService) { }

  clients!:any[];
  isLoading:boolean = false;
  panelOpenState:boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.clientService.getClients().subscribe(
      (res:any)=>{
        this.clients = res;
        this.isLoading = false;
      }
    )

  }
}
