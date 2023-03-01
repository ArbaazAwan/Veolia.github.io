import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  ) { }

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
      if (this.excelData.length > 0) {
        for (let index = 0; index < this.excelData.length; index++) {
          const data = this.excelData[index];
          //formatting date
          let dateString = null;
          if (data.InstallationDate) {
            const jsDate = new Date((data.InstallationDate - 25569) * 86400 * 1000);
            const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
            dateString = jsDate.toLocaleDateString('en-US', options);
          }
          const summary = {
            siteId: localStorage.getItem('siteId'),
            masterId: 0,
            unit: null,
            assetType: null,
            summarySize: null,
            dutyApplication: null,
            appDescription: null,
            quality: null,
            summaryload: data.Load,
            summaryStyle: null,
            life: null,
            quantity: data.Quantity,
            installmentDate: dateString,
            eqpFunctionalDesc: data.AssetDescription,
            assetId: data.AssetId,
            importAssetType: data.AssetType,
            assetHierarchy: data.AssetHierarchy,
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
