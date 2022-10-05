import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permissions-table',
  templateUrl: './permissions-table.component.html',
  styleUrls: ['./permissions-table.component.scss']
})
export class PermissionsTableComponent implements OnInit {

  users:any[]=[];
  admins:any[]=[];
  permissionsArray:any[]=[];

  constructor() {

   }

  ngOnInit(): void {

    this.users = [
      {
        name:'user1'
      },
      {
        name:'user2'
      },
      {
        name:'user3'
      },
      {
        name:'user4'
      },
      {
        name:'user5'
      }
    ];

    this.admins = [
      {
        name:'admin1'
      },
      {
        name:'admin2'
      }
    ]

  }

}
