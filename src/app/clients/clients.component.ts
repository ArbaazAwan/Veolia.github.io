import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor() { }
  showSideNav:boolean = true;
  form!:FormGroup;

  ngOnInit(): void {
  }

  selectedClient: any ={
    id:null,
    name:''
  };
  clients!:any[];
  onClientSelect(selectedClient:any){
    
  }

  toggleSideNavShow(){
    this.showSideNav = !this.showSideNav;
  }


}
