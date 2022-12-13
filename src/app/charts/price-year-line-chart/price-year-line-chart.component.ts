import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SummaryCalculationsService } from 'src/app/summary/summary-calculations.service';

@Component({
  selector: 'app-price-year-line-chart',
  templateUrl: './price-year-line-chart.component.html',
  styleUrls: ['./price-year-line-chart.component.scss'],
})
export class PriceYearLineChartComponent implements OnInit{
  constructor(private calculationService:SummaryCalculationsService ) { }
  data: any;
  basicOptions: any;

  ngOnInit(): void {

    this.graphOptions();
    this.calculationService.currentPricesYears.subscribe(
      (value:any)=>{
        this.graphData(value.years, value.prices);
      });

  }


  graphOptions(){
    this.basicOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            color: 'white',
          },
        },
        y: {
          ticks: {
            color: 'white',
            beginAtZero: true,
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: 'white',
          },
        },
      },
    };
  }

  graphData(years: any, prices: any) {
    this.data = {
      labels: years,
      datasets: [
        {
          label: 'Price',
          data: prices,
          tension: 0.4,
          borderWidth: 0.8,
          pointRadius: 7,
          pointBackgroundColor: 'rgba(255, 255, 255, .8)',
          pointBorderColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, .8)',
          backgroundColor: 'transparent',
          fill: true,
          maxBarThickness: 6,
        },
      ],
    };
  }
}
