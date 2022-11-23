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

  constructor(private masterService:MasterService, private nodeService:NodeService) {}

   @Input() eventEvalTableShow!:boolean;

   completeMaster:any;
   master:any = {};
   overhaul:any = {};
   events!:any[] ;
   cols: any[]=[];
   asset:any;
   files!: TreeNode[];
   isLoading:boolean = false;

  ngOnInit(): void {

    this.masterService.currentMasterId.subscribe(
      (el:any)=>{
        if(el)
        {
          this.getCompleteMasterById(el);
          this.initializeCols();
        }
      }
    )

  }

  initializeCols(){
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

  getCompleteMasterById(masterId:any)
  {
    this.isLoading = true;
    this.masterService.getCompleteMasterById(masterId) //hard coded id
    .subscribe(
      (el:any)=>{

        // console.log("complete master:",el);

        this.completeMaster = el;
        this.files = this.nodeService.getFilesystem(this.completeMaster); //initializing nodes

        // console.log("files:",this.files);

        if(this.completeMaster){

          if(this.completeMaster.master)
          this.master = this.completeMaster.master;

          if(this.completeMaster.events)
          this.events = this.completeMaster.events;

          if(this.completeMaster.overhaul)
          this.overhaul = this.completeMaster.overhaul;

        }

        this.isLoading = false;
        this.masterService.setMasterId(null);
      }
    )
  }


}
