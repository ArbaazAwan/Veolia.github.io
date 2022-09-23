import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-table',
  templateUrl: './model-table.component.html',
  styleUrls: ['./model-table.component.scss']
})
export class ModelTableComponent implements OnInit {

  constructor() { }

  @Input() modelArray!:any[];

  ngOnInit(): void {
  }

}
