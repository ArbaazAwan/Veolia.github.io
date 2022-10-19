import { Component, OnInit } from '@angular/core';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-master-table',
  templateUrl: './master-table.component.html',
  styleUrls: ['./master-table.component.scss']
})
export class MasterTableComponent implements OnInit {

  constructor(private masterService:MasterService) { }
  assetSearchText: string = '';
  assets!: any[];
  sortedAssets!: any[];

  ngOnInit(): void {
    this.assets = this.masterService.loadAssets(); //loading the assets
    this.sortedAssets = this.assets.slice();
  }
  sortAssets(sort: any) {
    const data = this.assets.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.sortedAssets = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'unitDesc':
          return this.compare(a.unitDesc, b.unitDesc, isAsc);
        case 'appDesc':
          return this.compare(a.appDesc, b.appDesc, isAsc);
        case 'unitMeas':
          return this.compare(a.unitMeas, b.unitMeas, isAsc);
        case 'rev':
          return this.compare(a.rev, b.rev, isAsc);
        case 'unitCode':
          return this.compare(a.unitCode, b.unitCode, isAsc);
        case 'appCode':
          return this.compare(a.appCode, b.appCode, isAsc);
        case 'replCost':
          return this.compare(a.replCost, b.replCost, isAsc);
        case 'lifeMOs':
          return this.compare(a.lifeMOs, b.lifeMOs, isAsc);
        case 'OHLife':
          return this.compare(a.OHLife, b.OHLife, isAsc);

        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean): any {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  viewAsset(asset: any) {
    this.masterService.setAsset(asset);
  }

  editAsset(asset: any) {
  }

}
