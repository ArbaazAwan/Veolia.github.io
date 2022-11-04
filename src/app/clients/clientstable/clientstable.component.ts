import { Component, Input, OnInit } from '@angular/core';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-clientstable',
  templateUrl: './clientstable.component.html',
  styleUrls: ['./clientstable.component.scss']
})
export class ClientstableComponent implements OnInit {

  constructor(private clientService:ClientService) { }

  // @Input() clientsArray!:any[];

  searchText:string='';
  clients:any[] =[];
  isLoading:boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.clientService.getClients().subscribe(
      (res:any)=>{
        this.clients= res;
        this.isLoading = false;
      }
    )
  }
  updateClient(id:any){
    this.clientService.updateClient(id);
  }
  deleteClient(id:any){
    this.clients = this.clients.filter(({clientId})=> clientId !=id);
    this.clientService.deleteClient(id);
  }

}
