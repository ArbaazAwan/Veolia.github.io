import { Component, OnInit } from '@angular/core';
import { MasterService } from './master.service';
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
  isLoading:boolean = false;

  constructor(private masterService:MasterService) {}

  ngOnInit(): void {}

  onViewMaster(masterId:any){
    this.isLoading = true;
    this.masterService.getMasterById(masterId).subscribe((el: any) => {
      this.viewMaster = el[0]
      this.isLoading = false;
    });
  }

}
