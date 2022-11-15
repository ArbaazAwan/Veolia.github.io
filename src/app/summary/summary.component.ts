import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SummaryService } from './summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @Input() title: string = 'Summary';

  form!: FormGroup;
  isLoading: boolean = false;
  summaryData: any[] = [];
  error: any = {};
  isEditFormLoading: boolean = true;
  isMasterLoading: boolean = true;
  assetTypes!: any[];
  sizes!: any[];
  discription!: any[];
  subApps!: any[];
  selectedSizes!: any[];
  selectedDiscriptions!: any[];
  currentSummary: any;
  qualities!: any[];
  selectedQualities!: any[];
  selectedQuality: any = {
    id: null,
    desc: '',
  };

  summarySelect = {
    assetTypes: [],
    sizes: [],
    discription: [],
    qualities: [],
  };

  selectedDiscription = { id: null, assetTypes: '', discription: '' };

  selectedAssetType = {
    id: null,
    name: '',
  };

  selectedSize = {
    id: null,
    assetTypes: '',
    name: '',
  };

  constructor(
    private fb: FormBuilder,
    private summaryService: SummaryService
  ) {}

  ngOnInit(): void {
    this.getSummary();
    this.initializeForm();
    this.summaryService.getMaster().subscribe((masters: any) => {
      this.summarySelect['assetTypes'] = masters.map((el: any, idx: any) => {
        return {
          id: idx,
          masterId: el.masterId,
          siteId: el.siteId,
          name: `${el.newAssetType} - ${el.oldAssetType}`,
        };
      });

      this.summarySelect['sizes'] = masters.map((el: any, idx: any) => {
        return {
          id: idx,
          assetType: `${el.newAssetType} - ${el.oldAssetType}`,
          name: el.masterSize,
        };
      });

      this.summarySelect['discription'] = masters.map((el: any, idx: any) => {
        return {
          id: idx,
          assetType: `${el.newAssetType} - ${el.oldAssetType}`,
          discription: `${el.newDescription} - ${el.oldDescription}`,
        };
      });

      this.summarySelect['qualities'] = masters.map((el: any, idx: any) => {
        return {
          id: idx,
          assetType: `${el.newAssetType} - ${el.oldAssetType}`,
          name: el.rev,
        };
      });

      this.assetTypes = this.summarySelect.assetTypes;
      this.sizes = this.summarySelect.sizes;
      this.discription = this.summarySelect.discription;
      this.qualities = this.summarySelect.qualities;

      this.onAssetTypeSelect(this.selectedAssetType);
      this.onSizeSelect(this.selectedSize);
      this.onDiscriptionSelect(this.selectedDiscription);

      console.log('this.summarySelect', this.summarySelect);

      this.isMasterLoading = false;
    });
  }

  resetForm() {
    this.form.reset();
  }

  getSummary() {
    this.isLoading = true;
    this.summaryService.getSummary().subscribe((res: any) => {
      this.summaryData = res;
      console.log(res, '??');
      this.isLoading = false;
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      unit: ['', Validators.required],
      // subApp: ['', Validators.required],
      assetType: ['', Validators.required],
      size: ['', Validators.required],
      summaryStyle: ['', Validators.required],
      discription: ['', Validators.required],
      quality: ['', Validators.required],
      quantity: ['', Validators.required],
      load: ['', Validators.required],
      life: ['', Validators.required],
      installmentDate: [new Date(), Validators.required],
    });
  }

  onAssetTypeSelect(selectedAssetType: any) {
    this.selectedSizes = this.sizes?.filter(
      (size: any) => size.assetType === selectedAssetType.name
    );
  }

  onSizeSelect(selectedSize: any) {
    this.selectedDiscriptions = this.discription?.filter(
      (el) => el.assetType === selectedSize.assetType
    );
  }

  onDiscriptionSelect(selectedDiscription: any) {
    console.log(selectedDiscription, 'selectedSize');

    this.selectedQualities = this.qualities?.filter(
      (el: any) => el.assetType === selectedDiscription.assetType
    );
  }

  mapCascadingFormValues() {
    this.form.value.assetType = this.assetTypes.find(
      (x: any) => x.id == this.form.value.assetType.id
    );

    this.form.value.size = this.sizes.find(
      (x: any) => x.id == this.form.value.size.id
    );

    this.form.value.discription = this.discription.find(
      (x: any) => x.id == this.form.value.discription.id
    );

    this.form.value.quality = this.qualities.find(
      (x: any) => x.id == this.form.value.quality.id
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

  submitForm() {
    if (this.form.valid) {
      this.isLoading = true;
      this.mapCascadingFormValues();

      const {
        unit,
        assetType,
        size,
        discription,
        quality,
        load,
        quantity,
        life,
        summaryStyle,
        installmentDate,
      } = this.form.value;

      const summaryPayload = {
        siteId: assetType.siteId,
        masterId: assetType.masterId,
        unit,
        assetType: assetType.name,
        summarySize: size.name,
        dutyApplication: discription.discription,
        appDescription: discription.discription,
        quality: quality.name,
        summaryload: load,
        summaryStyle,
        life,
        quantity,
        installmentDate,
      };

      this.summaryService.postSummary(summaryPayload).subscribe({
        next: (_: any) => {
          this.getSummary();
        },
        error: (err: any) => {
          this.getSummary();
          this.error = err;
        },
      });

      this.resetForm();
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  onEditSummary(id: any) {
    this.isEditFormLoading = true;

    this.summaryService.getSummaryById(id).subscribe((el) => {
      this.currentSummary = el;

      const {
        unit,
        assetType,
        summaryload,
        summarySize,
        discription,
        quality,
        summaryStyle,
        life,
        quantity,
        installmentDate,
      } = this.currentSummary[0];

      // this.form = this.fb.group({
      //   unit: [unit, Validators.required],
      //   assetType: [assetType, Validators.required],
      //   size: ['', Validators.required],
      //   style: [summaryStyle, Validators.required],
      //   discription: [discription, Validators.required],
      //   quality: [quality, Validators.required],
      //   quantity: [quantity, Validators.required],
      //   load: [summaryload, Validators.required],
      //   life: [life, Validators.required],
      //   installmentDate: [installmentDate, Validators.required],
      //   summarySize: [summarySize, Validators.required],
      // });

      this.isEditFormLoading = false;
    });
  }

  onDeleteSummary(id: any) {
    this.summaryData = this.summaryData.filter(
      ({ summaryId }) => summaryId != id
    );
    this.summaryService.deleteSummary(id);
  }
}
