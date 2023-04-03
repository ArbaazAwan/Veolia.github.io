import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from './master.service';
import { CreateMasterFormComponent } from './create-master-form/create-master-form.component';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  @ViewChild(CreateMasterFormComponent) createMasterComponent: CreateMasterFormComponent;
  eventEvalTableShow: boolean = false;
  siteId = localStorage.getItem('siteId');
  clientId: any = localStorage.getItem('clientId');
  viewMaster: any;
  excelData: any;
  isLoading: boolean = false;
  siteStatus: boolean = false;
  clientStatus: boolean = false;
  role: any = localStorage.getItem('role');

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {}

  onAddMaster(){
    this.createMasterComponent.resetForm();
  }

  onViewMaster(masterId: any) {
    this.isLoading = true;
    this.masterService.getMasterById(masterId).subscribe((el: any) => {
      this.viewMaster = el[0];
      this.isLoading = false;
    });
  }
}
