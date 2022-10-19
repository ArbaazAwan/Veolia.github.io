import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-userstable',
  templateUrl: './userstable.component.html',
  styleUrls: ['./userstable.component.scss']
})
export class UserstableComponent implements OnInit {

  constructor() { }

  @Input() userArray!:any[]
  searchText:string = '';

  ngOnInit(): void {
  }

}
