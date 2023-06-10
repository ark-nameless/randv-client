import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PackagesService } from 'src/app/apis/packages.service';

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.css']
})
export class NewPackageComponent {
  package = {
    name: "",
    image: "",
    content: "",
    plans: [
      {
        type: "day",
        label: "Daytime",
        price: 0,
        start_time: "",
        end_time: ""
      },
      {
        type: "night",
        label: "Overnight",
        price: 0,
        start_time: "",
        end_time: ""
      },
      {
        type: "whole",
        label: "24 hrs",
        price: 0,
        start_time: "",
        end_time: ""
      }
    ],
  }
  emptyPackage = {
    name: "",
    image: "",
    content: "",
    plans: [
      {
        type: "day",
        label: "Daytime",
        price: 0,
        start_time: "",
        end_time: ""
      },
      {
        type: "night",
        label: "Overnight",
        price: 0,
        start_time: "",
        end_time: ""
      },
      {
        type: "whole",
        label: "24 hrs",
        price: 0,
        start_time: "",
        end_time: ""
      }
    ],
  }

  modules = {}

  constructor(
    private messageService: MessageService,
    private packagesAPI: PackagesService
  ) {
    this.emptyPackage = this.package;
  }

  onSubmit() {
    this.package.plans[0].price = parseInt(`${this.package.plans[0].price}`);
    this.package.plans[1].price = parseInt(`${this.package.plans[1].price}`);
    this.package.plans[2].price = parseInt(`${this.package.plans[2].price}`);

    var data = {
      name: this.package.name,
      image: this.package.image,
      content: this.package.content,
      day_fee: this.package.plans[0].price,
      night_fee: this.package.plans[1].price,
      whole_day: this.package.plans[2].price,
      plans: this.package.plans,
    };

    console.log(data);

    if (data.content != '' && data.day_fee != 0 && data.night_fee != 0) {
      this.packagesAPI.createNewPackage(data).subscribe(
        (data) => {
          this.messageService.add({ severity: 'succes', summary: 'Success', detail: 'Successfully create a new package.' });
          this.package = this.emptyPackage;
        },
        (err) => {
          console.log(err);
        }
      )
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill up all the fields' });
    }
  }
}
