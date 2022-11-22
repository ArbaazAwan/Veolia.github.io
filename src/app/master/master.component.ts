import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  eventEvalTableShow: boolean = false;
  viewMaster: any;
  excelData: any;

  constructor() {}

  ngOnInit(): void {}

  onViewMaster(id: any) {}
}
