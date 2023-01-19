import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/clients/client.service';
import { SiteService } from 'src/app/sites/site.service';
import * as XLSX from 'xlsx';
import { SummaryService } from '../summary.service';

@Component({
  selector: 'app-import-summary',
  templateUrl: './import-summary.component.html',
  styleUrls: ['./import-summary.component.scss'],
})
export class ImportSummaryComponent implements OnInit {
  excelData: any;
  error: any;
  isLoading: any = false;
  siteStatus: boolean = false;
  siteId = localStorage.getItem('siteId');
  clientId = localStorage.getItem('clientId');
  clientStatus: boolean = false;

  @ViewChild('fileUpload') myInputVariable: ElementRef;

  constructor(
    private siteService: SiteService,
    private clientService: ClientService,
    private summaryService: SummaryService
  ) {}

  ngOnInit(): void {
    this.getSiteStatus();
    this.getClientStatus();
  }

  getSiteStatus() {
    this.siteService.getSiteById(this.siteId).subscribe({
      next: (site: any) => {
        this.siteStatus = site[0].siteStatus;
      },
      error: (err) => {
        console.log('error occured in getSiteStatus', err);
      },
    });
  }

  getClientStatus() {
    this.clientService.getClientById(this.clientId).subscribe({
      next: (client: any) => {
        this.clientStatus = client[0].clientStatus;
      },
      error: (err) => {
        console.log('error occured in getclientStatus', err);
      },
    });
  }

  readExcel(event: any) {
    var readIndex = 0;
    this.isLoading = true;
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workbook = XLSX.read(fileReader.result, { type: 'binary' });
      this.excelData = XLSX.utils.sheet_to_json(workbook.Sheets['summary']);
      console.log(this.excelData.length);
      if (this.excelData.length > 0) {
        for (let index = 0; index < this.excelData.length; index++) {
          var summaryData = Object.values(this.excelData[index]);
          const summary = {
            siteId: localStorage.getItem('siteId'),
            masterId: 1,
            unit: null,
            assetType: null,
            summarySize: null,
            dutyApplication: null,
            appDescription: null,
            quality: null,
            summaryload: null,
            summaryStyle: null,
            life: null,
            quantity: null,
            installmentDate: null,
            eqpFunctionalDesc: summaryData[0],
            assetId: summaryData[1],
            importAssetType: summaryData[2],
            assetHierarchy: summaryData[3],
          };

          this.summaryService.postSummary(summary).subscribe((res: any) => {
            readIndex++;
            if (readIndex == this.excelData.length) {
              this.isLoading = false;
              window.location.reload();
            }
          });
        }
      } else {
        this.error = 'Excel sheet not supported.';
        this.myInputVariable.nativeElement.value = '';
        this.isLoading = false;
      }
    };
  }
}
