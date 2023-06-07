import { Component } from '@angular/core';
import { PackagesService } from 'src/app/apis/packages.service';

@Component({
  selector: 'app-view-packages',
  templateUrl: './view-packages.component.html',
  styleUrls: ['./view-packages.component.css']
})
export class ViewPackagesComponent {
  packages: any = [];

  responsiveOptions: any[] = [];

  constructor(
    private packagesAPI: PackagesService
  ) {

  }

  ngOnInit() {
    this.packagesAPI.getAllPackages().subscribe((data) => {
      this.packages = data;
    });

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1
      },
    ];
  }
}
