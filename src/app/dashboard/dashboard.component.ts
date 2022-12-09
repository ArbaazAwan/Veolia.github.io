import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClientService } from '../clients/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  years:any = [];
  prices:any = [];
  clientId:any;
  clientContractYears:any = 0;
  contigency:FormControl = new FormControl(0);

  constructor(private clientService:ClientService) {}

  ngOnInit(): void {

    if (
      !localStorage.getItem('firstReload') ||
      localStorage.getItem('firstReload') == 'true'
    ) {
      localStorage.setItem('firstReload', 'false');
      window.location.reload();
    } else {
      localStorage.setItem('firstReload', 'true');
    }
    this.clientId = localStorage.getItem('clientId');
    this.getContractYears();

  }

  getYearsPrices(years:any, prices:any){
    for (let i = 1; i <= Number(this.clientContractYears); i++) {
      years.push('Year ' + i.toString());
      // prices.push(getRandomInt(500));
    }
  }

  getContractYears() {
    this.clientService.getClientById(this.clientId).subscribe((client: any) => {
      this.clientContractYears = client[0]?.contractYears;
      this.getYearsPrices(this.years, this.prices);
    });
  }
}
