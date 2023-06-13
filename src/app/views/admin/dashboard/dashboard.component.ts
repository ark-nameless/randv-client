import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ReportsService } from 'src/app/apis/reports.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  yearlySalesDate: Date = new Date();
  yearlySalesData: any = []
  yearlySalesOptions: any = {};

  
  provinceSalesRangeDates: any = [];
  provinceSalesData: any = [];
  provinceSalesOptions: any = {};

  constructor(
    private reportService: ReportsService,
  ) {
    this.populateYearlySales();
    this.populateProviceSales();
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.yearlySalesOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }

      }
    };

    this.provinceSalesOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

  populateYearlySales() {
    const documentStyle = getComputedStyle(document.documentElement);

    this.reportService.getYearlySales(this.yearlySalesDate.getFullYear()).subscribe(
      (data: any) => {
        console.log(data)
        this.yearlySalesData = {
          labels: Object.keys(data),
          datasets: [
            {
              label: 'Year Sales',
              backgroundColor: documentStyle.getPropertyValue('--blue-500'),
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              data: Object.values(data)
            },
          ]
        }
      }
    )
  }

  populateProviceSales() {
    const documentStyle = getComputedStyle(document.documentElement);
    
    let start = `01-01-${this.yearlySalesDate.getFullYear()}`;
    let end = `30-12-${this.yearlySalesDate.getFullYear()}`;

    if (this.provinceSalesRangeDates.length > 0) {
      start = this.provinceSalesRangeDates[0].toLocaleDateString("es-CL");
      if (this.provinceSalesRangeDates[1] !== null) {
        end = this.provinceSalesRangeDates[1].toLocaleDateString("es-CL");
      } else {
        end = start
      }
    }
    

    this.reportService.getAddressSales(start, end).subscribe(
      (data: any) => {
        console.log(data)
        this.provinceSalesData = {
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
              backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
            }
          ]
        };
      }
    )
  }
}
