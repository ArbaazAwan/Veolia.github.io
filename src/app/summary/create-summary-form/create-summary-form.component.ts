import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MasterService } from 'src/app/master/master.service';
import { SummaryService } from '../summary.service';

@Component({
  selector: 'app-create-summary-form',
  templateUrl: './create-summary-form.component.html',
  styleUrls: ['./create-summary-form.component.scss'],
})
export class CreateSummaryFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private summaryService: SummaryService,
    private masterService: MasterService
  ) {
    this.getForm();
  }
  @ViewChild('modalClose') modalClose: ElementRef;
  form!: FormGroup;
  filteredMasters: any = [];
  masters: any = [];
  isLoading: boolean = false;
  selectedMaster: any;
  submitted: boolean = false;
  siteId: any = localStorage.getItem('siteId');
  asset: FormControl = new FormControl(['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]]);
  masterId: any;
  lifeLoader: boolean = false;

  ngOnInit(): void {
    this.summaryService.currentSummaryId.subscribe((summaryId: any) => {
      if (summaryId) {
        this.onEditSummary(summaryId);
      }
    });
    this.getMasters();

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
        master?.masterStyle?.toLowerCase().indexOf(enteredData) > -1
      );
    });
  }

  onAssetChange(master: any) {
    let defaultQuantity = '1';
    let defaultLoad = '100';
    this.selectedMaster = master;
    let unit = this.getDisplayText(master);
    let c = this.getForm().controls;
    c.unit.setValue(unit);
    c.assetType.setValue(
      master.oldAssetType
        ? master.oldAssetType
        : '' + ' - ' + master.newAssetType
          ? master.newAssetType
          : ''
    );
    c.size.setValue(master.masterSize);
    c.summaryStyle.setValue(master.masterStyle);
    c.description.setValue(
      master.oldDescription
        ? master.oldDescription
        : '' + ',' + master.newDescription
          ? master.newDescription
          : ''
    );
    c.dutyApplication.setValue(master.dutyApplication);
    c.quality.setValue(master.quality);
    c.quantity.setValue(defaultQuantity);
    c.load.setValue(defaultLoad);
    c.life.setValue(null);
    c.masterId.setValue(master.masterId);
  }

  onInstallmentChange(installmentDate: Date) {
    this.lifeLoader = true;
    let currentYear = Number(new Date().getFullYear());
    let installationYear = Number(installmentDate.getFullYear());
    let yearsPassed = currentYear - installationYear;
    let totalYears = 0;
    if (this.selectedMaster?.lifeMonths) {
      totalYears = Math.ceil(Number(this.selectedMaster?.lifeMonths) / 12);
      let lifePerc = Math.round(
        ((totalYears - yearsPassed) / totalYears) * 100
      );
      this.form.get('life')?.setValue(lifePerc);
      this.lifeLoader = false;
    } else {
      this.masterService.getMasterById(this.masterId).subscribe((res: any) => {
        let master = res[0];
        totalYears = Math.ceil(Number(master?.lifeMonths) / 12);
        let lifePerc = Math.round(
          ((totalYears - yearsPassed) / totalYears) * 100
        );
        this.form.get('life')?.setValue(lifePerc);
        this.lifeLoader = false;
      });
    }
  }

  getDisplayText(master: any) {
    if (
      master.oldAssetType ||
      master.newAssetType ||
      master.masterStyle ||
      master.masterSize ||
      master.dutyApplication ||
      master.quality
    ) {
      return (
        master.oldAssetType +
        ' - ' +
        master?.newAssetType +
        ', ' +
        master?.masterStyle +
        ', ' +
        master?.masterSize +
        ', ' +
        master?.dutyApplication +
        ', ' +
        master?.quality
      );
    } else {
      return '';
    }
  }

  getMasters() {
    this.masterService.getMasters().subscribe(
      {
        next: (res: any) => {
          this.masters = res.masters;
        },
        error: (error) => {
          this.masterService.openSnackBar('No record found in master table', 'close');
        }
      }
    );
  }

  getForm() {
    return (this.form = this.fb.group({
      unit: '',
      masterId: [{ value: '', disabled: true }],
      assetType: '',
      size: '',
      summaryStyle: '',
      description: '',
      dutyApplication: '',
      quality: '',
      quantity: '1',
      load: '100',
      life: [null, Validators.required],
      installmentDate: [null, Validators.required],
    }));
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
      const {
        unit,
        assetType,
        size,
        masterId,
        description,
        dutyApplication,
        quality,
        load,
        quantity,
        life,
        summaryStyle,
        installmentDate,
      } = this.form.getRawValue();

      this.summaryService.currentSummaryId.subscribe((summaryId: any) => {
        if (summaryId) {
          const updateSummaryPayload = {
            siteId: this.siteId,
            masterId: masterId,
            unit: unit,
            assetType: assetType,
            summarySize: size,
            summaryStatus: true,
            dutyApplication: dutyApplication,
            appDescription: description,
            quality: quality,
            summaryload: load,
            summaryStyle: summaryStyle,
            life: life,
            quantity: quantity,
            installmentDate: installmentDate,
          };

          this.asset.setValue(unit);

          this.summaryService
            .updateSummary(updateSummaryPayload, summaryId)
            .subscribe((res: any) => {
              window.location.reload();
            });
        } else {
          const createSummaryPayload = {
            siteId: this.siteId,
            masterId: masterId,
            unit: unit,
            assetType: assetType,
            summarySize: size,
            dutyApplication: dutyApplication,
            appDescription: description,
            quality: quality,
            summaryload: load,
            summaryStyle: summaryStyle,
            life: life,
            quantity: quantity,
            installmentDate: installmentDate,
          };

          this.summaryService
            .postSummary(createSummaryPayload)
            .subscribe((res: any) => {
              window.location.reload();
            });
        }
      });
      this.modalClose.nativeElement.click();
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  onEditSummary(id: any) {
    this.isLoading = true;
    this.summaryService.getSummaryById(id).subscribe((el: any) => {
      let summary = el[0];
      const {
        unit,
        masterId,
        assetType,
        summaryload,
        summarySize,
        appDescription,
        dutyApplication,
        quality,
        summaryStyle,
        life,
        quantity,
        installmentDate,
      } = summary;

      this.masterId = masterId;

      let c = this.getForm().controls;
      c.unit.setValue(unit);
      c.assetType.setValue(assetType);
      c.size.setValue(summarySize);
      c.summaryStyle.setValue(summaryStyle);
      c.description.setValue(appDescription);
      c.dutyApplication.setValue(dutyApplication);
      c.quality.setValue(quality);
      c.quantity.setValue(quantity);
      c.load.setValue(summaryload);
      c.life.setValue(life);
      c.installmentDate.setValue(installmentDate);
      c.masterId.setValue(masterId);
      this.isLoading = false;
    });
  }

  resetForm() {
    this.form.reset();
    this.asset.setValue('');
  }
}
