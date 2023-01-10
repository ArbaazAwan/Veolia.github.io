import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientService } from '../clients/client.service';
import { SiteService } from '../sites/site.service';
import { SummaryService } from './summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  form!: FormGroup;
  isLoading: boolean = false;
  summaryData: any[] = [];
  error: any = {};
  isEditFormLoading: boolean = true;
  isMasterLoading: boolean = true;
  siteStatus: boolean = false;
  siteId = localStorage.getItem('siteId');
  clientId = localStorage.getItem('clientId');
  clientStatus: boolean = false;
  showButton:boolean = false;

  constructor(
    private siteService: SiteService,
    private clientService: ClientService,
    private summaryService: SummaryService
  ) {}

  ngOnInit(): void {
    this.getSiteStatus();
    this.getClientStatus();
    setTimeout(()=>{
      this.showButton = true;
    },1500);
  }

  getSiteStatus() {
    this.siteService.getSiteById(this.siteId).subscribe({
      next: (site: any) => {
        this.siteStatus = site[0].siteStatus;
        if (this.siteStatus == false) {
          this.summaryService.openSnackBar(
            'Site status is in-active. In order to insert records, please activate the site.',
            'close'
          );
        }
      },
      error: (err) => {
        this.summaryService.openSnackBar(
          'Error occured while fetching site details.',
          'close'
        );
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
        this.summaryService.openSnackBar(
          'Error occured while fetching client details.',
          'Close'
        );
      },
    });
  }
  getSummary(summaries: any) {
    this.summaryData = summaries;
  }
}
