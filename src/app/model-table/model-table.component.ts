import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-table',
  templateUrl: './model-table.component.html',
  styleUrls: ['./model-table.component.scss']
})
export class ModelTableComponent implements OnInit {

  isOpen:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  
  openModal(){
    this.isOpen = !this.isOpen;
  }

}
