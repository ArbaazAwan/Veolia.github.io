import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MasterService } from 'src/app/master/master.service';
import { SummaryService } from '../summary.service';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { SiteService } from 'src/app/sites/site.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SummaryMasterComponent } from './summary-master/summary-master.component';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-summarytable',
  templateUrl: './summarytable.component.html',
  styleUrls: ['./summarytable.component.scss'],
})
export class SummarytableComponent implements OnInit {

  @ViewChild('hiddenFormBtn') modal: ElementRef;
  summaries: any = [];
  filteredSummaries: any = [];
  siteId: any = localStorage.getItem('siteId');
  clonedSummaries: { [s: string]: any; } = {};
  filteredMasters: any = [];
  asset: FormControl = new FormControl(null);
  masters: any = [];
  selectedMaster: any;
  summary: any;
  isLoading: boolean = false;
  searchText!: FormControl;
  dateValid: boolean = true;
  siteStatus: boolean = false;
  showButton: boolean = false;
  public showForm = false;


  constructor(private summaryService: SummaryService, private masterService: MasterService,
    private siteService: SiteService, private _NgbModal:NgbModal) { }

  ngOnInit(): void {
    this.getSiteStatus();
    this.getSummaries();
    setTimeout(() => {
      this.showButton = true;
    }, 1500);
    this.asset.valueChanges.subscribe((value: any) => {
      this.filterData(value);
    });
    this.getMasters();

  }

  toggleModal() {
    this.showForm = !this.showForm;

    if (this.showForm) {
      setTimeout(
        () => {
          this.modal.nativeElement.click();
        }, 2000
      )
    }

  }

  editMaster(summary:any) {
    let masterId = summary.masterId;
    let summaryId = summary.summaryId;

    if(masterId)
    {
      let modalRef = this._NgbModal.open(SummaryMasterComponent,
        { fullscreen: true }
      );
      modalRef.componentInstance.summaryId = summaryId;
      modalRef.componentInstance.masterId = masterId;
    }
    else{
      this.summaryService.openSnackBar('This summary does not contain a master', 'Close');
    }
  }

  getSiteStatus() {
    this.siteService.getSiteById(this.siteId).subscribe({
      next: (site: any) => {
        this.siteStatus = site[0].siteStatus;
      },
      error: (err) => {
        console.log("error occured in getSiteStatus", err);
      }
    })
  }

  onAssetChange(master: any, summary: any) {

    this.selectedMaster = master;
    summary.masterId = master.masterId;
    summary.assetType = master.oldAssetType + ' - ' + master.newAssetType;
    summary.summaryStyle = master.masterStyle;
    summary.summarySize = master.masterSize;
    summary.dutyApplication = master.dutyApplication;
    summary.quality = master.quality;
    summary.importAssetType = master.oldAssetType + ' - ' + master.newAssetType;

    if(summary.installmentDate)
    this.onInstallmentChange(summary);
  }

  onInstallmentChange(summary: any) {

    if (summary.installmentDate) {
      let currentYear = Number(new Date().getFullYear());
      let installationYear = Number(summary.installmentDate?.getFullYear());
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
        summary.serviceYears = Math.ceil((lifePerc / 100) * totalYears);
        summary.life = lifePerc;
        summary.remainingLife = 100 - lifePerc;
        summary.remainingLife = 100 - lifePerc;

        if (lifePerc < 0) {
          this.dateValid = false;
          this.summaryService.openSnackBar(
            'Life percentage cannot be negative, please select a valid date', 'Close'
          );
        }
        else {
          this.dateValid = true;
        }

      } else {
        this.masterService.getMasterById(summary.masterId).subscribe((res: any) => {
          let master = res[0];
          totalYears = Math.ceil(Number(master?.lifeMonths) / 12);
          let lifePerc = Math.round(
            ((totalYears - yearsPassed) / totalYears) * 100
          );
          //adding cap on lifePerc
          if (lifePerc > 100) {
            lifePerc = 100;
          }
          summary.serviceYears = Math.ceil((lifePerc / 100) * totalYears);
          summary.life = lifePerc;
          summary.remainingLife = 100 - lifePerc;
          if (lifePerc < 0) {
            this.dateValid = false;
            this.summaryService.openSnackBar(
              'Life percentage cannot be negative, please select a valid date', 'Close'
            );
          }
          else {
            this.dateValid = true;
          }
        });
      }
    }
    else {
      summary.serviceYears = null;
      summary.life = null;
      summary.remainingLife = null;
    }

  }

  getUnitTemplate(master: any) {
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
    enteredData = enteredData?.toString().toLowerCase();
    this.filteredMasters = this.masters.filter((master: any) => {
      return (
        master?.newAssetType?.toLowerCase().indexOf(enteredData) > -1 ||
        master?.oldAssetType?.toLowerCase().indexOf(enteredData) > -1 ||
        master?.masterSize?.toLowerCase().indexOf(enteredData) > -1 ||
        master?.masterStyle?.toLowerCase().indexOf(enteredData) > -1 ||
        master?.unitDesc?.toLowerCase().indexOf(enteredData) > -1
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

  getSummaries() {
    this.isLoading = true;
    this.summaryService.getSummariesBySiteId(this.siteId).subscribe({
      next: (summaries: any) => {
        this.summaries = summaries.summary;
        this.filteredSummaries = this.summaries;
        this.isLoading = false;
      },
      error: (err) => {
        this.summaryService.openSnackBar('no record found in summary table', 'close');
        this.isLoading = false;
      }
    });
  }

  onSearch(text: any) {
    const searchPipe = new SearchPipe();
    this.filteredSummaries = searchPipe.transform(this.summaries, text);
  }

  onRowEditInit(summary: any) {
    if (summary.installmentDate) {
      let date = new Date(summary.installmentDate);
      summary.installmentDate = date;
      // this.onInstallmentChange(summary);
    }
    this.clonedSummaries[summary.summaryId] = { ...summary };
  }

  onRowDuplicate(summaryId: any) {
    this.isLoading = true;

    this.summaryService.getSummaryById(summaryId).subscribe((res: any) => {
      let summary = res[0];
      if (summary) {
        this.summaryService.postSummary(summary).subscribe(
          {
            next: (result: any) => {
              this.summaryService.openSnackBar('Duplicate Record is Created.', 'close')
              this.getSummaries();
              // window.location.reload();
            },
            error: (_) => {
              this.summaryService.openSnackBar('Error occured during duplication!', 'close')
            }
          }
        )
      }
    })

  }

  onRowEditSave(summary: any) {

    //date formatting
    summary.installmentDate = summary.installmentDate?.toString().split(' ').slice(0, 4).join(' ');

    const updateSummaryPayload = {
      siteId: summary.siteId,
      masterId: summary.masterId,
      unit: summary.unit,
      eqpFunctionalDesc: summary.eqpFunctionalDesc,
      assetType: summary.assetType,
      assetId: summary.assetId,
      importAssetType: summary.importAssetType,
      assetHierarchy: summary.assetHierarchy,
      summarySize: summary.summarySize,
      summaryStatus: true,
      dutyApplication: summary.dutyApplication,
      appDescription: summary.appDescription,
      quality: summary.quality,
      summaryload: summary.summaryload,
      summaryStyle: summary.summaryStyle,
      life: summary.life,
      quantity: summary.quantity,
      installmentDate: summary.installmentDate.toString().split(' ').slice(0, 4).join(' '),
      serviceYears: summary.serviceYears,
    };

    this.summaryService
      .updateSummary(updateSummaryPayload, summary.summaryId)
      .subscribe({
        next: (_) => {
          this.summaryService.openSnackBar('Record updated successfully!', 'close');
          delete this.clonedSummaries[summary.summaryId];
          this.getSummaries();
          // window.location.reload();
        },
        error: (_) => {
          this.summaryService.openSnackBar('Error occured during update.', 'close')
        }
      });
  }

  onRowDelete(summary: any) {
    this.summaryService
      .deleteSummary(summary.summaryId)
      .subscribe({
        next: (_) => {
          delete this.clonedSummaries[summary.summaryId];
          this.summaryService.openSnackBar('Record deleted successfully!', 'close');
          this.getSummaries();
          // window.location.reload();
        },
        error: (_) => {
          this.summaryService.openSnackBar('Error occured during update.', 'close')
        }
      });
  }

  onRowEditCancel(summary: any, index: any) {
    this.filteredSummaries[index] = this.clonedSummaries[summary.summaryId];
    delete this.clonedSummaries[summary.summaryId];
    this.getSummaries();
  }

}

