import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { MasterService } from '../master.service';
import { NodeService } from './node.service';

@Component({
  selector: 'app-view-master-table',
  templateUrl: './view-master-table.component.html',
  styleUrls: ['./view-master-table.component.scss']
})
export class ViewMasterTableComponent implements OnInit {

  constructor(private masterService:MasterService, private nodeService:NodeService) {
   }
   asset:any;
   files1!: TreeNode[];
   @Input() eventEvalTableShow!:boolean;
   @Input() master:any={}
    cols!: any[];

  events:any[] = [];

  ngOnInit(): void {
    
    this.nodeService.getFilesystem().then(files => this.files1 = files);

        this.cols = [
            { field: 'desc', header: '' },
            { field: 'oh', header: 'OverHaul'},
            { field: 'ev1', header: 'Event1' },
            { field: 'ev2', header: 'Event2' },
            { field: 'ev3', header: 'Event3' },
            { field: 'ev4', header: 'Event4' },
            { field: 'ev5', header: 'Event5' },
            { field: 'ev6', header: 'Event6' },
            { field: 'ev7', header: 'Event7' },
            { field: 'ev8', header: 'Event8' },

        ];
  }

  getEvents(){
    this.masterService.getEventsByMasterId(this.master.masterId).subscribe(
      (res:any)=>{
        this.events = res;
        console.log('these are events:',this.events);
      }
    )
  }



}
