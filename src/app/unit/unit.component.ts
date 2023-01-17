import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MasterService } from '../master/master.service';
import { ViewMasterTableComponent } from '../master/view-master-table/view-master-table.component';
import { UserService } from '../users/user.service';

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

  constructor(private masterService: MasterService, private userService: UserService) {}

  ngOnInit() {
    this.initForm();
    this.getMasters();
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
        master?.masterSize?.toLowerCase().indexOf(enteredData) > -1 ||
        master?.masterStyle?.toLowerCase().indexOf(enteredData) > -1 ||
        master?.unitDesc?.toLowerCase().indexOf(enteredData) > -1
      );
    });
  }

  getMasters() {
    this.masterService.getMasters().subscribe(
      {
        next:(res: any) => {
          this.masters = res.masters;
        },
        error:(error)=>{
          this.userService.openSnackBar('No record found in master table', 'close');
        }
      }
      );
  }

  getSelectedMaster(master: any) {
    this.masterId = master.masterId;
    this.masterService.setMasterId(master.masterId);
  }

  getDisplayText(master: any) {
    if (master.oldAssetType || master.newAssetType
      || master.masterStyle || master.masterSize
      || master.dutyApplication || master.quality) {
      return master.oldAssetType + " - " + master?.newAssetType
        + ", " + master?.masterStyle + ", " + master?.masterSize
        + ", " + master?.dutyApplication + ", " + master?.quality
    }
    else {
      return '';
    }
  }

  processModel() {
    this.child.exportToExcel('detailsTable');
    this.userService.openSnackBar('File is ready to export', 'close');
  }
}
