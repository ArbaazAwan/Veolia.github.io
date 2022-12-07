import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MasterService } from '../master/master.service';
import { ViewMasterTableComponent } from '../master/view-master-table/view-master-table.component';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
})
export class UnitComponent implements OnInit {
  @ViewChild(ViewMasterTableComponent) child: ViewMasterTableComponent;
  searchText = '';
  title = 'Unit';
  masters: any = [];
  filteredMasters: any = [];
  formGroup!: any;
  siteId: any = localStorage.getItem('siteId');
  eventEvalTableShow: boolean = true;
  asset: FormControl = new FormControl('');
  masterId: any = null;

  constructor(private masterService: MasterService) {}

  ngOnInit() {
    this.initForm();
    this.getMastersBySiteId(this.siteId);
  }

  initForm() {
    this.asset.valueChanges.subscribe((value: any) => {
      this.filterData(value);
    });
  }

  filterData(enteredData: any) {
    enteredData = enteredData.toString().toLowerCase();
    this.filteredMasters = this.masters.filter((master: any) => {
      return (
        master?.newAssetType?.toLowerCase().indexOf(enteredData) > -1 ||
        master?.oldAssetType?.toLowerCase().indexOf(enteredData) > -1 ||
        master?.masterSize.toLowerCase().indexOf(enteredData) > -1 ||
        master?.masterStyle.toLowerCase().indexOf(enteredData) > -1
      );
    });
  }

  getMastersBySiteId(siteId: any) {
    this.masterService.getMastersBySiteId(siteId).subscribe((res: any) => {
      if (res.masters) this.masters = res.masters;
    });
  }

  getSelectedMaster(master: any) {
    this.masterId = master.masterId;
    this.masterService.setMasterId(master.masterId);
  }

  getDisplayText(master: any) {
    if (master) {
      return (
        master.oldAssetType +
        ' - ' +
        master?.newAssetType +
        ', ' +
        master?.masterStyle +
        ', ' +
        master?.masterSize
      );
    } else {
      return '';
    }
  }

  processModel() {
    this.child.exportToExcel('detailsTable');
  }
}
