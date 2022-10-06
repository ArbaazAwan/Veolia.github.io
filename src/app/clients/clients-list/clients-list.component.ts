import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  constructor() { }

  clientsArray!:any[];

  ngOnInit(): void {
    this.clientsArray = [
      {
        id:'1',
        name:'Client 1',
        companyName:'Company1',
        email:'email1@example.com'
      },
      {
        id:'2',
        name:'Client 2',
        companyName:'Company2',
        email:'email2@example.com'
      },
      {
        id:'3',
        name:'Client 3',
        companyName:'Company3',
        email:'email3@example.com'
      },
      {
        id:'4',
        name:'Client 4',
        companyName:'Company4',
        email:'email4@example.com'
      },
      {
        id:'5',
        name:'Client 5',
        companyName:'Company5',
        email:'email5@example.com'
      },
    ]
  }
}
