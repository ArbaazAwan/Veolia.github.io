import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {

  eventEvalTableShow: boolean = false;
  viewMaster:any;

  constructor() {}

  ngOnInit(): void {}

  onViewMaster(id:any){

    // this.masterService.getMasterById(id).subscribe((el: any) => {
    //   this.viewMaster = el[0]
    // });
  }

}
