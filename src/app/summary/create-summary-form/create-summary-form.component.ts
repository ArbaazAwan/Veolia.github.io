import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-create-summary-form',
  templateUrl: './create-summary-form.component.html',
  styleUrls: ['./create-summary-form.component.scss'],
})
export class CreateSummaryFormComponent implements OnInit {
  @Input() title: string = 'Summary';
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      unitName: ['', Validators.required],
      assetType: ['', Validators.required],
      size: ['', Validators.required],
      app: ['', Validators.required],
      subApp: ['', Validators.required],
      quality: ['', Validators.required],
      quantity: ['', Validators.required],
      load: ['', Validators.required],
      life: ['', Validators.required],
      isChecked: false,
    });
  }
  form!: FormGroup;

  db!: any[];
  assetTypes!: any[];
  sizes!: any[];
  apps!: any[];
  subApps!: any[];
  selectedAssetType: any = {
    id: null,
    name: '',
  };
  qualities!: any[];

  selectedSizes!: any[];

  selectedSize: any = {
    id: null,
    desc: '',
    app_id: null,
  };

  selectedApps!: any[];
  selectedApp: any = {
    id: null,
    desc: '',
  };

  selectedSubApps!: any[];
  selectedSubApp: any = {
    id: null,
    quality_id: null,
    desc: '',
  };

  selectedQualities!: any[];
  selectedQuality: any = {
    id: null,
    desc: '',
  };

  submitted: boolean = false;

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
            app_id: 3,
          },
          {
            id: 2,
            desc: '6 ft wide',
            assetType_id: 1,
            app_id: 3,
          },
          {
            id: 3,
            desc: '< 4ft wide',
            assetType_id: 1,
            app_id: 3,
          },
          {
            id: 4,
            desc: '4ft to 5ft wide',
            assetType_id: 1,
            app_id: 3,
          },
          {
            id: 5,
            desc: '6ft to 8ft wide',
            assetType_id: 1,
            app_id: 3,
          },
          {
            id: 6,
            desc: '24 to 36',
            assetType_id: 1,
            app_id: 3,
          },
          {
            id: 7,
            desc: 'medium',
            assetType_id: 2,
            app_id: 3,
          },
          {
            id: 8,
            desc: 'large',
            assetType_id: 2,
            app_id: 3,
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
            desc: 'screen',
          },
        ],
      },
      {
        subApps: [
          {
            id: 1,
            desc: 'hydraulic ram',
            app_id: 1,
            quality_id: 1,
          },
          {
            id: 2,
            desc: 'screw',
            app_id: 1,
            quality_id: 2,
          },
          {
            id: 3,
            desc: 'annular type rotary drum',
            app_id: 3,
            quality_id: 1,
          },
          {
            id: 4,
            desc: 'chain mat',
            app_id: 3,
            quality_id: 1,
          },
          {
            id: 5,
            desc: 'climber',
            app_id: 3,
            quality_id: 2,
          },
          {
            id: 6,
            desc: 'manual bar screen',
            app_id: 3,
            quality_id: 2,
          },
          {
            id: 7,
            desc: 'rotary drum',
            app_id: 3,
            quality_id: 1,
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
    this.onSubAppSelect(this.selectedSubApp);
  }

  onAssetTypeSelect(selectedAssetType: any) {
    this.selectedSizes = this.sizes.filter(
      (size: any) => size.assetType_id == selectedAssetType.id
    );
  }

  onSizeSelect(selectedSize: any) {
    this.selectedApps = this.apps.filter(
      (app) => app.id == selectedSize.app_id
    );
  }

  onAppSelect(selectedApp: any) {
    this.selectedSubApps = this.subApps.filter(
      (subApp) => subApp.app_id == selectedApp.id
    );
  }

  onSubAppSelect(selectedSubApp: any) {
    this.selectedQualities = this.qualities.filter(
      (q) => q.id == selectedSubApp.quality_id
    );
  }

  mapCascadingFormValues() {
    this.form.value.assetType = this.assetTypes.find(
      (x: any) => x.id == this.form.value.assetType
    );
    this.form.value.size = this.sizes.find(
      (x: any) => x.id == this.form.value.size
    );
    this.form.value.app = this.apps.find(
      (x: any) => x.id == this.form.value.app
    );
    this.form.value.subApp = this.subApps.find(
      (x: any) => x.id == this.form.value.subApp
    );
    this.form.value.quality = this.qualities.find(
      (x: any) => x.id == this.form.value.quality
    );
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup)
        this.validateAllFormFields(control);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;
      this.mapCascadingFormValues();
      this.form.reset();
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  onCancel() {
    this.form.reset();
  }
}
