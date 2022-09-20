import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  constructor(private fb:FormBuilder) {
    this.form =fb.group({
      unitName:'',
      assetType:'',
      size:'',
      app:'',
      subApp:'',
      quality:'',
      quantity:'',
      load:'',
      life:'',
    })
  }
  form!:FormGroup;

  db!: any[];
  assetTypes!: any[];
  sizes!: any[];
  apps!: any[];
  subApps!: any[];
  selectedAssetType: any ={
    id:0,
    name:''
  };
  qualities!: any[];
  selectedSizes!: any[];
  selectedSize: any = {
    id: 0,
    desc: '',
    app_id:0
  };

  selectedApps!: any[];
  selectedApp: any = {
    id: 0,
    desc: ''
  };

  selectedSubApps!:any[];
  selectedSubApp:any={
    id:0,
    quality_id:0,
    desc:''
  }

  selectedQualities!:any[];
  selectedQuality:any={
    id:0,
    desc:''
  }

  summaryArray:any[]=[];

  ngOnInit(): void {
    this.db = [
      {
        assetTypes: [
          {
            id: 1,
            name: 'BSCALL',
          },
          {
            id: 2,
            name: 'CLRCRC',
          },
        ],
      },
      {
        sizes: [
          {
            id: 1,
            desc: '24 to 36 in',
            assetType_id: 1,
            app_id:3
          },
          {
            id: 2,
            desc: '6 ft wide',
            assetType_id: 1,
            app_id:3
          },
          {
            id: 3,
            desc: '< 4ft wide',
            assetType_id: 1,
            app_id:3
          },
          {
            id: 4,
            desc: '4ft to 5ft wide',
            assetType_id: 1,
            app_id:3
          },
          {
            id: 5,
            desc: '6ft to 8ft wide',
            assetType_id: 1,
            app_id:3
          },
          {
            id: 6,
            desc: '24 to 36',
            assetType_id: 1,
            app_id:3
          },
          {
            id: 7,
            desc: 'medium',
            assetType_id: 2,
            app_id:3
          },
          {
            id: 8,
            desc: 'large',
            assetType_id: 2,
            app_id:3
          },
        ],
      },
      {
        apps: [
          {
            id: 1,
            desc: 'compactor',
          },
          {
            id: 2,
            desc: 'filter/strainer',
          },
          {
            id: 3,
            desc: 'screen'
          },
        ],
      },
      {
        subApps: [
          {
            id: 1,
            desc: 'hydraulic ram',
            app_id: 1,
            quality_id:1

          },
          {
            id: 2,
            desc: 'screw',
            app_id: 1,
            quality_id:2
          },
          {
            id: 3,
            desc: 'annular type rotary drum',
            app_id: 3,
            quality_id:1
          },
          {
            id: 4,
            desc: 'chain mat',
            app_id: 3,
            quality_id:1
          },
          {
            id: 5,
            desc: 'climber',
            app_id: 3,
            quality_id:2
          },
          {
            id: 6,
            desc: 'manual bar screen',
            app_id: 3,
            quality_id:2
          },
          {
            id: 7,
            desc: 'rotary drum',
            app_id: 3,
            quality_id:1
          },
        ],
      },
      {
        qualities: [
          {
            id: 1,
            desc: 'stainless',
            assetType_id: 1,
          },
          {
            id: 2,
            desc: 'fiber glass',
            assetType_id: 1,
          },
        ],
      },
    ];

    this.assetTypes = this.db[0].assetTypes;
    this.sizes = this.db[1].sizes;
    this.apps = this.db[2].apps;
    this.subApps = this.db[3].subApps;
    this.qualities = this.db[4].qualities;

    this.onAssetTypeSelect(this.selectedAssetType);
    this.onSizeSelect(this.selectedSize);
    this.onAppSelect(this.selectedApp);
    this.onSubAppSelect(this.selectedSubApp)
    console.log('these are assetTypes', this.assetTypes);
  }

  onAssetTypeSelect(selectedAssetType: any) {
    this.selectedSizes = this.sizes.filter(
      (size: any) => size.assetType_id == selectedAssetType.id
    );
  }

  onSizeSelect(selectedSize: any) {
    this.selectedApps = this.apps.filter((app) => app.id == selectedSize.app_id);

  }

  onAppSelect(selectedApp:any){
    this.selectedSubApps = this.subApps.filter((subApp)=>subApp.app_id == selectedApp.id);
  }

  onSubAppSelect(selectedSubApp:any){
    this.selectedQualities = this.qualities.filter((q)=>q.id == selectedSubApp.quality_id);
  }

  onSubmit(){
    this.summaryArray.push(this.form.value);
    console.log('summary array value', this.selectedAssetType);

  }
}
