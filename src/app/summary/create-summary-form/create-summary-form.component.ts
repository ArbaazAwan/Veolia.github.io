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

  constructor(private fb: FormBuilder, private summaryService: SummaryService, private masterService: MasterService) {
    this.getForm();
  }
  @ViewChild('modalClose') modalClose:ElementRef;
  form!: FormGroup;
  filteredMasters: any = [];
  masters: any = [];
  selectedMaster: any;
  submitted: boolean = false;
  siteId: any = localStorage.getItem('siteId');
  asset: FormControl = new FormControl(['', Validators.required]);
  masterId: any;

  ngOnInit(): void {

    this.summaryService.currentSummaryId.subscribe(
      (summaryId: any) => {
        if (summaryId) {
          this.onEditSummary(summaryId);
        }
      }
    )
    this.getMastersBySiteId(this.siteId);

    this.asset.valueChanges.subscribe((value: any) => {
      this.filterData(value)
    });

  }

  filterData(enteredData: any) {
    enteredData = enteredData.toString().toLowerCase();
    this.filteredMasters = this.masters.filter((master: any) => {
      return master?.newAssetType?.toLowerCase().indexOf(enteredData) > -1
        || master?.oldAssetType?.toLowerCase().indexOf(enteredData) > -1
        || master?.masterSize.toLowerCase().indexOf(enteredData) > -1
        || master?.masterStyle.toLowerCase().indexOf(enteredData) > -1
    });
  }

  onAssetChange(master: any) {

    this.selectedMaster = master;
    let unit = this.getDisplayText(master);

    let c = this.getForm().controls;
    c.unit.setValue(unit);
    c.assetType.setValue(master.oldAssetType ? master.oldAssetType : '' + ' - ' + master.newAssetType ? master.newAssetType : '')
    c.size.setValue(master.masterSize)
    c.summaryStyle.setValue(master.masterStyle)
    c.description.setValue(master.oldDescription ? master.oldDescription : '' + ',' + master.newDescription ? master.newDescription : '')
    c.quality.setValue(null)
    c.quantity.setValue(null)
    c.load.setValue(null)
    c.life.setValue(null)
    this.masterId = master.masterId;
  }

  onInstallmentChange(installmentDate: Date) {

    let currentYear = Number(new Date().getFullYear());
    let installationYear = Number(installmentDate.getFullYear());
    let yearsPassed = currentYear - installationYear;
    let totalYears = Math.ceil(Number(this.selectedMaster?.lifeMonths) / 12);
    let lifePerc = ((totalYears - yearsPassed) / totalYears) * 100;
    this.form.get('life')?.setValue(lifePerc);

  }

  getDisplayText(master: any) {
    if (master.oldAssetType || master.newAssetType
      || master.masterStyle || master.masterSize) {
      return master.oldAssetType + " - " + master?.newAssetType
        + ", " + master?.masterStyle + ", " + master?.masterSize
    }
    else {
      return '';
    }
  }

  getMastersBySiteId(siteId: any) {
    if (siteId) {
      this.masterService.getMastersBySiteId(siteId).subscribe(
        (res: any) => {
          if (res.masters)
            this.masters = res.masters;
        })
    }
  }

  getForm() {
    return this.form = this.fb.group({
      unit: '',
      assetType: '',
      size: '',
      summaryStyle: '',
      description: '',
      quality: '',
      quantity: null,
      load: null,
      life: [null,Validators.required],
      installmentDate: [null, Validators.required],
    });
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
        description,
        quality,
        load,
        quantity,
        life,
        summaryStyle,
        installmentDate,
      } = this.form.getRawValue();

      this.summaryService.currentSummaryId.subscribe(
        (summaryId:any)=>{
          // console.log("asset", this.asset);
          if(summaryId)
          {
            const updateSummaryPayload = {
              siteId: this.siteId,
              masterId: this.masterId,
              unit:unit,
              assetType: assetType,
              summarySize: size,
              summaryStatus:true,
              dutyApplication: description,
              appDescription: description,
              quality: quality,
              summaryload: load,
              summaryStyle:summaryStyle,
              life:life,
              quantity: quantity,
              installmentDate:installmentDate
            };

            this.asset.setValue(unit)

            this.summaryService.updateSummary(updateSummaryPayload,summaryId).subscribe(
              (res:any)=>{
                console.log(res);
                window.location.reload();
              }
            )
          }
          else
          {
            // console.log("asset in create:", this.asset);
            const createSummaryPayload = {
              siteId: this.siteId,
              masterId: this.masterId,
              unit:unit,
              assetType: assetType,
              summarySize: size,
              dutyApplication: description,
              appDescription: description,
              quality: quality,
              summaryload: load,
              summaryStyle:summaryStyle,
              life:life,
              quantity: quantity,
              installmentDate:installmentDate
            };

            // console.log("create summary payload:",createSummaryPayload);

            this.summaryService.postSummary(createSummaryPayload).subscribe(
             (res:any)=>{
              console.log(res);
              window.location.reload();
             }
            );
          }
        }
      )
        this.modalClose.nativeElement.click();
    }
    else {
      this.validateAllFormFields(this.form);
    }
  }

  onEditSummary(id: any) {


    this.summaryService.getSummaryById(id).subscribe((el: any) => {

      let summary = el[0];
      const {
        unit,
        masterId,
        assetType,
        summaryload,
        summarySize,
        description,
        quality,
        summaryStyle,
        life,
        quantity,
        installmentDate,
      } = summary

      let c = this.getForm().controls;
      c.unit.setValue(unit)
      c.assetType.setValue(assetType)
      c.size.setValue(summarySize)
      c.summaryStyle.setValue(summaryStyle)
      c.description.setValue(description)
      c.quality.setValue(quality)
      c.quantity.setValue(quantity)
      c.load.setValue(summaryload)
      c.life.setValue(life)
      c.installmentDate.setValue(installmentDate);
      this.masterId = masterId;

    });
  }

  resetForm() {
    this.form.reset();
  }
}
