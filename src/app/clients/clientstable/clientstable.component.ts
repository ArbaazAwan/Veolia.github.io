import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientstable',
  templateUrl: './clientstable.component.html',
  styleUrls: ['./clientstable.component.scss']
})
export class ClientstableComponent implements OnInit {

  constructor() { }
  selectedClient: any ={
    id:null,
    name:''
  };
  clients!:any[];
  onClientSelect(selectedClient:any){

  }

  ngOnInit(): void {
  }

}