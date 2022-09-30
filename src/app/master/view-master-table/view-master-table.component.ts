import { Component, Input, OnInit } from '@angular/core';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-view-master-table',
  templateUrl: './view-master-table.component.html',
  styleUrls: ['./view-master-table.component.scss']
})
export class ViewMasterTableComponent implements OnInit {

  constructor(private masterService:MasterService) { }
   asset:any;

  ngOnInit(): void {
    this.masterService.asset.subscribe(
      value=>{
        this.asset = value;
      }
    )
  }

}
