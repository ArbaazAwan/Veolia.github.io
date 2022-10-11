import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  assets!: any[];
  asset!: Subject<any>;
  showSideNav: boolean = true;

  constructor() {
    this.asset = new Subject<any>();
  }


  toggleShowSideNav() {
    this.showSideNav = !this.showSideNav;
  }

  setAsset(asset: any) {
    this.asset.next(asset);
  }

  loadAssets() {
    return this.assets = [


      {
        id: '2',
        unitDesc: 'asset2',
        appDesc: 'appdesc 2',
        unitMeas: 'unit meas2',
        rev: '234',
        unitCode: '2',
        appCode: '2',
        replCost: '123',
        lifeMOs: '12',
        OHLife: '80',
        event1: {
          title: 'event1',
          Every: 'every1',
          Strch: 'strch1',
          maintenance1: {
            desc: 'M1',
            cost: '123'
          },
          maintenance2: {
            desc: 'M2',
            cost: '234'
          },
          maintenance3: {
            desc: 'M3',
            cost: '345'
          },
          maintenance4: {
            desc: 'M4',
            cost: '456'
          },
          maintenance5: {
            desc: 'M5',
            cost: '567'
          },
          labor1: {
            level: 'skilled',
            hours: '2'
          },
          labor2: {
            level: 'unskilled',
            hours: '1'
          },
          labor3: {
            level: 'skilled',
            hours: '3'
          },
          labor4: {
            level: 'unskilled',
            hours: '2'
          },
          cost1: {
            desc: 'cost1',
            amount: '123'
          },
          cost2: {
            desc: 'cost2',
            amount: '234'
          },
          cost3: {
            desc: 'cost3',
            amount: '345'
          }
        },
        event2: {
          title: 'event2',
          Every: 'every2',
          Strch: 'strch2',
          maintenance1: {
            desc: 'M1',
            cost: '123'
          },
          maintenance2: {
            desc: 'M2',
            cost: '234'
          },
          maintenance3: {
            desc: 'M3',
            cost: '345'
          },
          maintenance4: {
            desc: 'M4',
            cost: '456'
          },
          maintenance5: {
            desc: 'M5',
            cost: '567'
          },
          labor1: {
            level: 'skilled',
            hours: '2'
          },
          labor2: {
            level: 'unskilled',
            hours: '1'
          },
          labor3: {
            level: 'skilled',
            hours: '3'
          },
          labor4: {
            level: 'unskilled',
            hours: '2'
          },
          cost1: {
            desc: 'cost1',
            amount: '123'
          },
          cost2: {
            desc: 'cost2',
            amount: '234'
          },
          cost3: {
            desc: 'cost3',
            amount: '345'
          }
        },
      },

      {
        id: '1',
        unitDesc: 'asset1',
        appDesc: 'appdesc 1',
        unitMeas: 'unit meas1',
        rev: '123',
        unitCode: '1',
        appCode: '1',
        replCost: '123',
        lifeMOs: '12',
        OHLife: '80',
        event1: {
          title: 'event1',
          Every: 'every1',
          Strch: 'strch1',
          maintenance1: {
            desc: 'M1',
            cost: '123'
          },
          maintenance2: {
            desc: 'M2',
            cost: '234'
          },
          maintenance3: {
            desc: 'M3',
            cost: '345'
          },
          maintenance4: {
            desc: 'M4',
            cost: '456'
          },
          maintenance5: {
            desc: 'M5',
            cost: '567'
          },
          labor1: {
            level: 'skilled',
            hours: '2'
          },
          labor2: {
            level: 'unskilled',
            hours: '1'
          },
          labor3: {
            level: 'skilled',
            hours: '3'
          },
          labor4: {
            level: 'unskilled',
            hours: '2'
          },
          cost1: {
            desc: 'cost1',
            amount: '123'
          },
          cost2: {
            desc: 'cost2',
            amount: '234'
          },
          cost3: {
            desc: 'cost3',
            amount: '345'
          }
        },
        event2: {
          title: 'event2',
          Every: 'every2',
          Strch: 'strch2',
          maintenance1: {
            desc: 'M1',
            cost: '123'
          },
          maintenance2: {
            desc: 'M2',
            cost: '234'
          },
          maintenance3: {
            desc: 'M3',
            cost: '345'
          },
          maintenance4: {
            desc: 'M4',
            cost: '456'
          },
          maintenance5: {
            desc: 'M5',
            cost: '567'
          },
          labor1: {
            level: 'skilled',
            hours: '2'
          },
          labor2: {
            level: 'unskilled',
            hours: '1'
          },
          labor3: {
            level: 'skilled',
            hours: '3'
          },
          labor4: {
            level: 'unskilled',
            hours: '2'
          },
          cost1: {
            desc: 'cost1',
            amount: '123'
          },
          cost2: {
            desc: 'cost2',
            amount: '234'
          },
          cost3: {
            desc: 'cost3',
            amount: '345'
          }
        },
      },
      {
        id: '4',
        unitDesc: 'asset4',
        appDesc: 'appdesc 4',
        unitMeas: 'unit meas4',
        rev: '456',
        unitCode: '4',
        appCode: '4',
        replCost: '123',
        lifeMOs: '12',
        OHLife: '80',
        event1: {
          title: 'event1',
          Every: 'every1',
          Strch: 'strch1',
          maintenance1: {
            desc: 'M1',
            cost: '123'
          },
          maintenance2: {
            desc: 'M2',
            cost: '234'
          },
          maintenance3: {
            desc: 'M3',
            cost: '345'
          },
          maintenance4: {
            desc: 'M4',
            cost: '456'
          },
          maintenance5: {
            desc: 'M5',
            cost: '567'
          },
          labor1: {
            level: 'skilled',
            hours: '2'
          },
          labor2: {
            level: 'unskilled',
            hours: '1'
          },
          labor3: {
            level: 'skilled',
            hours: '3'
          },
          labor4: {
            level: 'unskilled',
            hours: '2'
          },
          cost1: {
            desc: 'cost1',
            amount: '123'
          },
          cost2: {
            desc: 'cost2',
            amount: '234'
          },
          cost3: {
            desc: 'cost3',
            amount: '345'
          }
        },
      },
      {
        id: '7',
        unitDesc: 'asset7',
        appDesc: 'appdesc 7',
        unitMeas: 'unit meas7',
        rev: '789',
        unitCode: '7',
        appCode: '7',
        replCost: '123',
        lifeMOs: '12',
        OHLife: '80',
        event6: {
          title: 'event6',
          Every: 'every6',
          Strch: 'strch6',
          maintenance1: {
            desc: 'M1',
            cost: '123'
          },
          maintenance2: {
            desc: 'M2',
            cost: '234'
          },
          maintenance3: {
            desc: 'M3',
            cost: '345'
          },
          maintenance4: {
            desc: 'M4',
            cost: '456'
          },
          maintenance5: {
            desc: 'M5',
            cost: '567'
          },
          labor1: {
            level: 'skilled',
            hours: '2'
          },
          labor2: {
            level: 'unskilled',
            hours: '1'
          },
          labor3: {
            level: 'skilled',
            hours: '3'
          },
          labor4: {
            level: 'unskilled',
            hours: '2'
          },
          cost1: {
            desc: 'cost1',
            amount: '123'
          },
          cost2: {
            desc: 'cost2',
            amount: '234'
          },
          cost3: {
            desc: 'cost3',
            amount: '345'
          }
        },
      },
      {
        id: '5',
        unitDesc: 'asset5',
        appDesc: 'appdesc 5',
        unitMeas: 'unit meas5',
        rev: '567',
        unitCode: '5',
        appCode: '5',
        replCost: '123',
        lifeMOs: '12',
        OHLife: '80',
        event1: {
          title: 'event1',
          Every: 'every1',
          Strch: 'strch1',
          maintenance1: {
            desc: 'M1',
            cost: '123'
          },
          maintenance2: {
            desc: 'M2',
            cost: '234'
          },
          maintenance3: {
            desc: 'M3',
            cost: '345'
          },
          maintenance4: {
            desc: 'M4',
            cost: '456'
          },
          maintenance5: {
            desc: 'M5',
            cost: '567'
          },
          labor1: {
            level: 'skilled',
            hours: '2'
          },
          labor2: {
            level: 'unskilled',
            hours: '1'
          },
          labor3: {
            level: 'skilled',
            hours: '3'
          },
          labor4: {
            level: 'unskilled',
            hours: '2'
          },
          cost1: {
            desc: 'cost1',
            amount: '123'
          },
          cost2: {
            desc: 'cost2',
            amount: '234'
          },
          cost3: {
            desc: 'cost3',
            amount: '345'
          }
        },
      },
      {
        id: '3',
        assetName: 'asset3',
        appDesc: 'appdesc 3',
        unitMeas: 'unit meas3',
        rev: '345',
        unitCode: '3',
        appCode: '3',
        replCost: '123',
        lifeMOs: '12',
        OHLife: '80',
        event5: {
          title: 'event5',
          Every: 'every5',
          Strch: 'strch5',
          maintenance1: {
            desc: 'M1',
            cost: '123'
          },
          maintenance2: {
            desc: 'M2',
            cost: '234'
          },
          maintenance3: {
            desc: 'M3',
            cost: '345'
          },
          maintenance4: {
            desc: 'M4',
            cost: '456'
          },
          maintenance5: {
            desc: 'M5',
            cost: '567'
          },
          labor1: {
            level: 'skilled',
            hours: '2'
          },
          labor2: {
            level: 'unskilled',
            hours: '1'
          },
          labor3: {
            level: 'skilled',
            hours: '3'
          },
          labor4: {
            level: 'unskilled',
            hours: '2'
          },
          cost1: {
            desc: 'cost1',
            amount: '123'
          },
          cost2: {
            desc: 'cost2',
            amount: '234'
          },
          cost3: {
            desc: 'cost3',
            amount: '345'
          }
        },
      },
      {
        id: '6',
        unitDesc: 'asset6',
        appDesc: 'appdesc 6',
        unitMeas: 'unit meas6',
        rev: '678',
        unitCode: '6',
        appCode: '6',
        replCost: '123',
        lifeMOs: '12',
        OHLife: '80',
        event8: {
          title: 'event8',
          Every: 'every8',
          Strch: 'strch8',
          maintenance1: {
            desc: 'M1',
            cost: '123'
          },
          maintenance2: {
            desc: 'M2',
            cost: '234'
          },
          maintenance3: {
            desc: 'M3',
            cost: '345'
          },
          maintenance4: {
            desc: 'M4',
            cost: '456'
          },
          maintenance5: {
            desc: 'M5',
            cost: '567'
          },
          labor1: {
            level: 'skilled',
            hours: '2'
          },
          labor2: {
            level: 'unskilled',
            hours: '1'
          },
          labor3: {
            level: 'skilled',
            hours: '3'
          },
          labor4: {
            level: 'unskilled',
            hours: '2'
          },
          cost1: {
            desc: 'cost1',
            amount: '123'
          },
          cost2: {
            desc: 'cost2',
            amount: '234'
          },
          cost3: {
            desc: 'cost3',
            amount: '345'
          }
        },
      },


    ]
  }
}
