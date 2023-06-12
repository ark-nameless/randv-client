import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PackagesService } from 'src/app/apis/packages.service';
import { ReservationsService } from 'src/app/apis/reservations.service';

@Component({
  selector: 'app-book-package',
  templateUrl: './book-package.component.html',
  styleUrls: ['./book-package.component.css'],
  providers: [MessageService],
})
export class BookPackageComponent {
  rangeDates: any = [];
  selectedPackage: any = {}
  total = 0;

  plans: any[] = [];
  selectedPlan: any = '';

  info = {
    customer_name: '',
    email: '',
    contact_no: '',

    arrival: '',
    departure: '',

    package_id: '',
    reference_no:''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private packagesService: PackagesService,
    private reservationsService: ReservationsService,
    private messageService: MessageService,
  ) {
    const id = this.route.snapshot.params['id'];

    this.packagesService.getPackage(id).subscribe(
      (data) => {
        this.selectedPackage = data;

        data.plans.forEach((e: any) => {
          this.plans.push({
            code: e.type,
            label: `${e.label}: ${e.price} (${e.start_time}-${e.end_time})`
          });
        });
        console.log(this.plans);
      }, (err) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Package information is corrupted, Redirecting to Packages' });
        setTimeout(() => {
          this.router.navigate(['/packages'])
        }, 3000)
      }
    )
  }

  ngOnInit() {
    

  }

  checkAvailability() {
    this.info.arrival = this.rangeDates[0].toLocaleDateString("en-US")
    if (this.rangeDates[1] !== null) {
      this.info.departure = this.rangeDates[1].toLocaleDateString("en-US");
    } else {
      this.info.departure = '';
    }

    var payload = {
      customer_name: this.info.customer_name,
      email: this.info.email,
      contact_no: this.info.contact_no,

      arrival: this.info.arrival,
      departure: this.info.departure,

      package_id: this.selectedPackage.id,
      selected_time: this.selectedPlan,
      reference_no: this.info.reference_no,
      type: 'package',
    }
    
    var multiplier = 1;
    if (this.info.departure !== '') {
      var start = new Date(this.info.arrival);
      var end = new Date(this.info.departure);
      var diff = Math.abs(start.getTime() - end.getTime());
      var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
      multiplier += diffDays
    }

    let price: any = this.selectedPackage.plans.filter((d: any) => d['type'] == this.selectedPlan)[0];
    this.total = price.price * multiplier;

    this.reservationsService.checkReservationAvailability(payload).subscribe(
      (data: any) => {
        console.log(data)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your Reservation is Available, You can Proceed to click \'Book Now\'' });
      }, (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sorry, somebody is already reserved at the date that you\'ve selected, Please selected a new date' });
      }
    );
  }
  
  filledUp(){
    return !this.info.reference_no || !this.selectedPlan || !this.info.customer_name || !this.info.contact_no || !this.info.email || (this.rangeDates == undefined || this.rangeDates.length == 0)
  }

  onSubmit() {
    this.info.arrival = this.rangeDates[0].toLocaleDateString("en-US")
    if (this.rangeDates[1] !== null) {
      this.info.departure = this.rangeDates[1].toLocaleDateString("en-US");
    }

    var payload = {
      customer_name: this.info.customer_name,
      email: this.info.email,
      contact_no: this.info.contact_no,

      arrival: this.info.arrival,
      departure: this.info.departure,

      package_id: this.selectedPackage.id,
      selected_time: this.selectedPlan,
      reference_no: `${this.info.reference_no}`,
      total_amount: this.total,
    }
    console.log(payload);

    if (!this.filledUp()) {
      this.reservationsService.createNewPackageReservation(payload).subscribe(
        (data: any) => {
          console.log();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your Reservation is successful, please wait for the email that we will send you. Thank you' });
          setTimeout(() => {this.router.navigate(['/'])}, 3000);
        }, (err: any) => {
          console.log(err);
        }
      )
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill up all the fields' });
    }
  }
}
