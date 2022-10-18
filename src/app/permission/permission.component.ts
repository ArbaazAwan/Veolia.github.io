import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  constructor() { }
  @Input() title:string = 'Permissions';

  ngOnInit(): void {
  }

}
