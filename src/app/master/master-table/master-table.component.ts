import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SiteService } from 'src/app/sites/site.service';
import { UserService } from 'src/app/users/user.service';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-master-table',
  templateUrl: './master-table.component.html',
  styleUrls: ['./master-table.component.scss'],
})
export class MasterTableComponent implements OnInit {
  constructor(private masterService: MasterService, private userService: UserService, private siteService:SiteService) {}
  assetSearchText: string = '';
  sortedMasters: any[] = [];
  masters: any[] = [];
  isLoading: boolean = false;
  p: number = 1;
  siteId = localStorage.getItem('siteId');
  message: any;
  siteStatus:boolean=false;

  @Output() viewMasterEvent = new EventEmitter();

  ngOnInit(): void {
    this.getSiteStatus();
    if (this.siteId) this.getMasters(this.siteId);
  }

  getSiteStatus(){
    this.siteService.getSiteById(this.siteId).subscribe({
      next:(site:any)=>{
        this.siteStatus = site[0].siteStatus;
      },
      error:(err)=>{
        console.log("error occured in getSiteStatus", err);
      }
    })
  }

  sortAssets(sort: any) {
    const data = this.masters.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.sortedMasters = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'masterId':
          return this.compare(a.masterId, b.masterId, isAsc);
        case 'oldAssetType':
          return this.compare(a.oldAssetType, b.oldAssetType, isAsc);
        case 'newAssetType':
          return this.compare(a.newAssetType, b.newAssetType, isAsc);
        case 'masterStyle':
          return this.compare(a.masterStyle, b.masterStyle, isAsc);
        case 'masterSize':
          return this.compare(a.masterSize, b.masterSize, isAsc);
        case 'oldDescription':
          return this.compare(a.oldDescription, b.oldDescription, isAsc);
        case 'newDescription':
          return this.compare(a.newDescription, b.newDescription, isAsc);
        case 'unitMeasurement':
          return this.compare(a.unitMeasurement, b.unitMeasurement, isAsc);
        case 'rev':
          return this.compare(a.rev, b.rev, isAsc);
        case 'replacementCost':
          return this.compare(a.replacementCost, b.replacementCost, isAsc);
        case 'lifeMonths':
          return this.compare(a.lifeMonths, b.lifeMonths, isAsc);
        case 'OHLife':
          return this.compare(a.overhaulLife, b.overhaulLife, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean): any {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  viewMaster(masterId: any) {
    this.masterService.setMasterId(masterId);
  }

  getMasters(siteId: any) {
    this.isLoading = true;
    this.masterService.getMastersBySiteId(siteId).subscribe({
      next: (masters: any) => {
        this.masters = masters.masters;
        this.sortAssets({ active: 'masterId', direction: 'desc' });
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      },
    });
  }

  editMaster(masterId: any) {
    this.masterService.setMasterId(masterId);
  }

  deleteMaster(id: any) {
    this.masterService.deleteMaster(id).subscribe((res: any) => {
     this.userService.openSnackBar('Master Deleted', 'close');
    });
  }

  onDuplicate(masterId: any) {
    this.masterService.getCompleteMasterById(masterId).subscribe((res: any) => {
      if (res) {
        this.masterService.postCompleteMaster(res).subscribe((result: any) => {
          window.location.reload();
        });
      }
    });
  }
}
