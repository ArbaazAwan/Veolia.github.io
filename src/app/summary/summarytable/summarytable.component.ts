import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summarytable',
  templateUrl: './summarytable.component.html',
  styleUrls: ['./summarytable.component.scss']
})
export class SummarytableComponent implements OnInit {

  constructor() { }

  @Input() summaryArray!:any[];

  ngOnInit(): void {
  }

}
