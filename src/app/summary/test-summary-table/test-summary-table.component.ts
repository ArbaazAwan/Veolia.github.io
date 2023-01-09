import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsoleLogger } from '@aws-amplify/core';
import { MasterService } from 'src/app/master/master.service';
import { SummaryService } from '../summary.service';

@Component({
  selector: 'app-test-summary-table',
  templateUrl: './test-summary-table.component.html',
  styleUrls: ['./test-summary-table.component.scss']
})
export class TestSummaryTableComponent implements OnInit {

  summaryData: any = [];
  siteId: any = localStorage.getItem('siteId');
  clonedSummaries: { [s: string]: any; } = {};
  filteredMasters: any = [];
  asset: FormControl = new FormControl(null);
  masters: any = [];
  selectedMaster:any;
  summary:any;
  editing:boolean = false;

  form:FormGroup = this.fb.group({
    unit: '',
    masterId: [{ value: '', disabled: true }],
    assetType: '',
    summarySize: '',
    summaryStyle: '',
    appDescription: '',
    dutyApplication: '',
    quality: '',
    quantity: '1',
    summaryload: '100',
    life: [null, Validators.required],
    installmentDate: [null, Validators.required],
  })

  constructor(private summaryService: SummaryService, private masterService:MasterService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getSummaries();
    this.asset.valueChanges.subscribe((value: any) => {
      this.filterData(value);
    });
    this.getMasters();
  }


  onAssetChange(master: any) {

    this.summary.masterId = master.masterId;
    this.summary.unit = this.getUnit(master);
    this.summary.assetType = master.oldAssetType + ' - ' + master.newAssetType;
    this.summary.summaryStyle = master.masterStyle;
    this.summary.summarySize = master.masterSize;
    this.summary.dutyApplication = master.dutyApplication;
    this.summary.quality = master.quality;

  }

  onInstallmentChange(summary:any) {

    let x = summary.installmentDate.split('-');
    let installmentDate = Number(x[0]);

    let currentYear = Number(new Date().getFullYear());
    let installationYear = Number(installmentDate);
    let yearsPassed = currentYear - installationYear;
    let totalYears = 0;
    if (this.selectedMaster?.lifeMonths) {
      totalYears = Math.ceil(Number(this.selectedMaster?.lifeMonths) / 12);
      let lifePerc = Math.round(
        ((totalYears - yearsPassed) / totalYears) * 100
      );
      summary.life = lifePerc;
    } else {
      this.masterService.getMasterById(summary.masterId).subscribe((res: any) => {
        let master = res[0];
        totalYears = Math.ceil(Number(master?.lifeMonths) / 12);
        let lifePerc = Math.round(
          ((totalYears - yearsPassed) / totalYears) * 100
        );
        summary.life = lifePerc;
      });
    }
  }

  getUnit(master: any) {
    if (
      master.oldAssetType ||
      master.newAssetType ||
      master.masterStyle ||
      master.masterSize ||
      master.dutyApplication ||
      master.quality
    ) {
      return (
        master?.oldAssetType +
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

  getSummaries(){
    this.summaryService.getSummariesBySiteId(this.siteId).subscribe({
      next: (summaries: any) => {
        this.summaryData = summaries.summary;
      },
      error: (err) => {
        this.summaryService.openSnackBar('no record found in summary table', 'close');
      }
    });
  }

  onRowEditInit(summary: any) {
    this.clonedSummaries[summary.summaryId] = { ...summary };
    this.summary = summary;
    this.editing = true;
  }

  onRowEditSave(summary: any) {

    const updateSummaryPayload = {
      siteId: summary.siteId,
      masterId: summary.masterId,
      unit: summary.unit,
      assetType: summary.assetType,
      summarySize: summary.summarySize,
      summaryStatus: true,
      dutyApplication: summary.dutyApplication,
      appDescription: summary.appDescription,
      quality: summary.quality,
      summaryload: summary.summaryload,
      summaryStyle: summary.summaryStyle,
      life: summary.life,
      quantity: summary.quantity,
      installmentDate: summary.installmentDate,
    };

    this.summaryService
      .updateSummary(updateSummaryPayload, summary.summaryId)
      .subscribe({
        next:(_)=>{
          this.summaryService.openSnackBar('Record updated successfully!', 'close');
          delete this.clonedSummaries[summary.summaryId];
          this.getSummaries();
        },
        error:(_)=>{
          this.summaryService.openSnackBar('Error occured during update.', 'close')
        }
      });
      this.editing = false;
  }

  onRowDelete(summary:any){
    this.summaryService
      .deleteSummary(summary.summaryId)
      .subscribe({
        next:(_)=>{
          delete this.clonedSummaries[summary.summaryId];
          this.summaryService.openSnackBar('Record deleted successfully!', 'close');
          this.getSummaries();
        },
        error:(_)=>{
          this.summaryService.openSnackBar('Error occured during update.', 'close')
        }
      });
  }

  onRowEditCancel(summary: any, index: any) {
    this.summaryData[index] = this.clonedSummaries[summary.summaryId];
    delete this.summaryData[summary.summaryId];
    this.editing = false;
  }


}