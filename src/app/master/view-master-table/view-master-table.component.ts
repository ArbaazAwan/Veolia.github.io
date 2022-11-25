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
        }
      }
    )

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
          {
            this.events = this.completeMaster.events;
            this.cols = [
              { field: 'desc', header: '' },
              { field: 'oh', header: 'OverHaul'}
          ];

          for(let i = 0; i<this.events?.length; i++){
            let obj = { field: 'ev'+ (i+1), header: 'Event ' + (i+1)}
            this.cols.push(obj);
          }
          }

          if(this.completeMaster.overhaul)
          this.overhaul = this.completeMaster.overhaul;

        }

        this.isLoading = false;
        this.masterService.setMasterId(null);
      }
    )
  }


}
