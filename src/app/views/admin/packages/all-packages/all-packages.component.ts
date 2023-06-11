import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PackagesService } from 'src/app/apis/packages.service';

@Component({
  selector: 'app-all-packages',
  templateUrl: './all-packages.component.html',
  styleUrls: ['./all-packages.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AllPackagesComponent {
  packages: any = [];

  responsiveOptions: any[] = [];

  constructor(
    private router: Router,
    private packagesAPI: PackagesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {

  }

  ngOnInit() {
    this.packagesAPI.getAllPackages().subscribe((data) => {
      this.packages = data;
      console.log(this.packages);
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

  remove(event: Event, id: any) {
    const target = event.target || undefined;

    this.confirmationService.confirm({
      target: target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.packagesAPI.deletePackage(id).subscribe(
          (data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Package deleted' });
            window.location.reload()
          }, (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: err.error.detail });
          }
        )
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
