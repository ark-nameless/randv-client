import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PackagesService } from 'src/app/apis/packages.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent {
  packages: any = [];

  responsiveOptions: any[] = [];

  constructor(
    private router: Router,
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

  bookPackage(id: any, data: any) {
    this.router.navigate(['book-package', id])
  }
}
