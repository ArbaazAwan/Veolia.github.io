import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private fb: FormBuilder, private summaryService:SummaryService, private masterService:MasterService) {
    this.getForm();
  }
  form!: FormGroup;
  filteredMasters: any = [];
  masters: any = [];
  submitted: boolean = false;
  siteId:any = localStorage.getItem('siteId');
  asset:FormControl = new FormControl(['', Validators.required]);

  ngOnInit(): void {

    this.summaryService.currentSummaryId.subscribe(
      (summaryId:any)=>{
        if(summaryId){
          this.onEditSummary(summaryId);
        }
      }
    )
    this.getMastersBySiteId(this.siteId);

    this.asset.valueChanges.subscribe((response: any) => {
      console.log("initializeForm response",response);
        this.filterData(response)
      });
  }

  filterData(enteredData: any){
    this.filteredMasters = this.masters.filter((master:any) => {
      return master?.newAssetType?.toLowerCase().indexOf(enteredData) > -1
      || master?.oldAssetType?.toLowerCase().indexOf(enteredData) > -1
      || master?.masterSize.toLowerCase().indexOf(enteredData) > -1
      || master?.masterStyle.toLowerCase().indexOf(enteredData) > -1
    });
  }

  onAssetChange(master:any){

  //     "masterId": 3096,
  //     "siteId": "37",
  //     "replacementCost": "150000",
  //     "lifeMonths": "300",
  //     "overhaulLife": "84",

    let unit =  this.getDisplayText(master);

    let c =  this.getForm().controls;
    c.unit.setValue(unit);
    c.assetType.setValue(master.oldAssetType + ',' + master.newAssetType)
    c.size.setValue(master.masterSize)
    c.summaryStyle.setValue(master.masterStyle)
    c.discription.setValue(master.oldDescription + ',' + master.newDescription)
    c.quality.setValue(null)
    c.quantity.setValue(null)
    c.load.setValue(null)
    c.life.setValue(null)
  }

  getDisplayText(master:any){
    if(master)
    {
      return master.oldAssetType + " | " + master?.newAssetType
      + ", " + master?.masterStyle + ", " + master?.masterSize
    }
    else{
      return '';
    }
  }

  getMastersBySiteId(siteId:any){
    if(siteId){
      this.masterService.getMastersBySiteId(siteId).subscribe(
      (res:any)=>{
        if(res.masters)
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
      discription: '',
      quality: '',
      quantity: '',
      load: '',
      life: '',
      installmentDate: [new Date(), Validators.required],
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
          discription,
          quality,
          load,
          quantity,
          life,
          summaryStyle,
          installmentDate,
        } = this.form.getRawValue();

        const summaryPayload = {
          siteId: this.siteId,
          masterId: this.asset.value.masterId,
          unit:unit,
          assetType: assetType,
          summarySize: size,
          dutyApplication: discription,
          appDescription: discription,
          quality: quality,
          summaryload: load,
          summaryStyle:summaryStyle,
          life:life,
          quantity: quantity,
          installmentDate:installmentDate
        };

        this.summaryService.postSummary(summaryPayload).subscribe(
         (res:any)=>{
          console.log(res);
          window.location.reload();
         }
        );

        this.resetForm();
      }
       else {
        this.validateAllFormFields(this.form);
    }
  }

  onEditSummary(id:any) {


    this.summaryService.getSummaryById(id).subscribe((el:any) => {

      let summary = el[0];
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
      } = summary

      let c =  this.getForm().controls;
      c.unit.setValue(unit)
      c.assetType.setValue(assetType)
      c.size.setValue(summarySize)
      c.summaryStyle.setValue(summaryStyle)
      c.discription.setValue(discription)
      c.quality.setValue(quality)
      c.quantity.setValue(quantity)
      c.load.setValue(summaryload)
      c.life.setValue(life)
      c.installmentDate.setValue(installmentDate);

    });
  }

  resetForm() {
    this.form.reset();
  }
}
