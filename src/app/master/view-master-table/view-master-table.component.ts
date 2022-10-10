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
    cols!: any[];

  ngOnInit(): void {
    this.masterService.asset.subscribe(
      value=>{
        this.asset = value;
      }
    )

    this.nodeService.getFilesystem().then(files => this.files1 = files);

        this.cols = [
            { field: 'desc', header: '' },
            { field: 'ev1', header: 'Event1' },
            { field: 'ev2', header: 'Event2' },
            { field: 'ev3', header: 'Event3' },
            { field: 'ev4', header: 'Event4' },
            { field: 'ev5', header: 'Event5' },
            { field: 'ev6', header: 'Event6' },
            { field: 'ev7', header: 'Event7' },
            { field: 'ev8', header: 'Event8' },
            { field: 'oh', header: 'OverHaul'}
        ];
  }

}
