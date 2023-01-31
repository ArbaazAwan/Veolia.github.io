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
  form: FormGroup = this.getForm();
  filteredMasters: any = [];
  masters: any = [];
  isLoading: boolean = false;
  selectedMaster: any;
  submitted: boolean = false;
  siteId: any = localStorage.getItem('siteId');
  asset: FormControl = new FormControl(['']);
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
        master?.quality?.toLowerCase().indexOf(enteredData) > -1 ||
        master?.dutyApplication?.toLowerCase().indexOf(enteredData) > -1 ||
        master?.masterStyle?.toLowerCase().indexOf(enteredData) > -1 ||
        master?.unitDesc?.toLowerCase().indexOf(enteredData) > -1
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
    c.importAssetType.setValue(master.oldAssetType);

    let years = Math.ceil(Number(master.lifeMonths) / 12);
    c.lifeMonthsYears.setValue(master.lifeMonths + '/' + years)
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
      //adding cap on lifePerc
      if (lifePerc > 100) {
        lifePerc = 100;
      }

      this.form.get('serviceYears')?.setValue(Math.ceil((lifePerc / 100) * totalYears));
      this.form.get('life')?.setValue(lifePerc);
      this.form.get('remainingLife')?.setValue(100 - lifePerc);
      this.lifeLoader = false;
      //date validation
      if (lifePerc < 0) {
        this.summaryService.openSnackBar(
          'Life percentage cannot be negative, please select a valid date', 'Close'
        );
      }
    } else {
      this.masterService.getMasterById(this.masterId).subscribe((res: any) => {
        let master = res[0];
        totalYears = Math.ceil(Number(master?.lifeMonths) / 12);
        let lifePerc = Math.round(
          ((totalYears - yearsPassed) / totalYears) * 100
        );
        //adding cap on lifePerc
        if (lifePerc > 100) {
          lifePerc = 100;
        }
        this.form.get('serviceYears')?.setValue(Math.ceil((lifePerc / 100) * totalYears));
        this.form.get('life')?.setValue(lifePerc);
        this.form.get('remainingLife')?.setValue(100 - lifePerc);
        //date validation
        if (lifePerc < 0) {
          this.summaryService.openSnackBar(
            'Life percentage cannot be negative, please select a valid date', 'Close'
          );
        }
        this.lifeLoader = false;
      });
    }
  }
  lifeChange() {
    this.form.get('remainingLife')?.setValue(100 - this.form.value.life);
  }

  rLifeChange() {
    this.form.get('life')?.setValue(100 - this.form.value.remainingLife);

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
    this.masterService.getMasters().subscribe({
      next: (res: any) => {
        this.masters = res.masters;
      },
      error: (error) => {
        this.masterService.openSnackBar(
          'No record found in master table',
          'close'
        );
      },
    });
  }

  getForm() {
    return (this.form = this.fb.group({
      unit: '',
      eqpFunctionalDesc: null,
      masterId: [{ value: '', disabled: true }],
      assetId: null,
      importAssetType: '',
      assetHierarchy: 'NA',
      assetType: '',
      size: '',
      summaryStyle: '',
      description: '',
      dutyApplication: '',
      quality: '',
      quantity: '1',
      load: '100',
      life: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      remainingLife: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      installmentDate: [null, Validators.required],
      lifeMonthsYears: [{ value: '', disabled: true }],
      serviceYears: null,
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
        eqpFunctionalDesc,
        assetType,
        assetId,
        importAssetType,
        assetHierarchy,
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
        serviceYears,
      } = this.form.getRawValue();

      this.summaryService.currentSummaryId.subscribe((summaryId: any) => {
        if (summaryId) {
          const updateSummaryPayload = {
            siteId: this.siteId,
            masterId: masterId,
            unit: unit,
            eqpFunctionalDesc: eqpFunctionalDesc,
            assetType: assetType,
            assetId: assetId,
            importAssetType: importAssetType,
            assetHierarchy: assetHierarchy,
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
            serviceYears: serviceYears,
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
            eqpFunctionalDesc: eqpFunctionalDesc,
            assetType: assetType,
            assetId: assetId,
            importAssetType: importAssetType,
            assetHierarchy: assetHierarchy,
            summarySize: size,
            dutyApplication: dutyApplication,
            appDescription: description,
            quality: quality,
            summaryload: load,
            summaryStyle: summaryStyle,
            life: life,
            quantity: quantity,
            installmentDate: installmentDate,
            serviceYears: serviceYears,
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
        eqpFunctionalDesc,
        masterId,
        assetType,
        assetId,
        importAssetType,
        assetHierarchy,
        summaryload,
        summarySize,
        appDescription,
        dutyApplication,
        quality,
        summaryStyle,
        life,
        quantity,
        installmentDate,
        serviceYears,
      } = summary;

      this.masterId = masterId;

      let c = this.getForm().controls;
      c.unit.setValue(unit);
      c.eqpFunctionalDesc.setValue(eqpFunctionalDesc);
      c.assetType.setValue(assetType);
      c.assetId.setValue(assetId);
      c.importAssetType.setValue(importAssetType);
      c.assetHierarchy.setValue(assetHierarchy);
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
      c.serviceYears.setValue(serviceYears);
      this.isLoading = false;
    });
  }

  resetForm() {
    this.form.reset();
    this.asset.setValue('');
  }
}
