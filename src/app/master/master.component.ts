import { Component, OnInit } from '@angular/core';
import { MasterService } from './master.service';
import * as XLSX from 'xlsx';
import { SiteService } from '../sites/site.service';
import { ClientService } from '../clients/client.service';
import { SummaryService } from '../summary/summary.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  eventEvalTableShow: boolean = false;
  siteId = localStorage.getItem('siteId');
  clientId: any = localStorage.getItem('clientId');
  viewMaster: any;
  excelData: any;
  isLoading: boolean = false;
  siteStatus: boolean = false;
  clientStatus: boolean = false;
  role: any = localStorage.getItem('role');

  constructor(
    private masterService: MasterService,
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
        if (this.siteStatus == false) {
          this.summaryService.openSnackBar(
            'Site status is in-active. In order to insert records, please activate the site.',
            'Close'
          );
        }
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
        if (this.clientStatus == false) {
          this.summaryService.openSnackBar(
            'Client status is in-active. In order to insert records, please activate the client.',
            'Close'
          );
        }
      },
      error: (err) => {
        console.log('error occured in getclientStatus', err);
      },
    });
  }

  onViewMaster(masterId: any) {
    this.isLoading = true;
    this.masterService.getMasterById(masterId).subscribe((el: any) => {
      this.viewMaster = el[0];
      this.isLoading = false;
    });
  }
}
