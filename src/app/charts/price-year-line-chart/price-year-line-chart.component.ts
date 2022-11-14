import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-year-line-chart',
  templateUrl: './price-year-line-chart.component.html',
  styleUrls: ['./price-year-line-chart.component.scss'],
})
export class PriceYearLineChartComponent implements OnInit {
  constructor() {}
  data: any;
  basicOptions: any;

  ngOnInit(): void {
    let years: string[] = [];
    let prices: number[] = [];

    function getRandomInt(max: number) {
      // return Math.floor(Math.random() * max);
    }

    for (let i = 1; i <= 50; i++) {
      years.push('Year ' + i.toString());
      // prices.push(getRandomInt(500));
    }
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
    this.data = {
      labels: years,
      datasets: [
        {
          label: 'Price',
          data: prices,
          tension: 0.4,
          borderWidth: 0.8,
          pointRadius: 5,
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
