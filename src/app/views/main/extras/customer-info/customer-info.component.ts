import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ReservationsService } from 'src/app/apis/reservations.service';
import { BookingInfoService } from 'src/app/services/booking-info.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css'],
  providers: [MessageService],
})
export class CustomerInfoComponent {
  rangeDates: any = [];

  info = {
    customer_name: '',
    contact_no: '',
    email: '',
    arrival: '',
    departure: ''
  }

  constructor(
    private router: Router,
    private bookingInfoService: BookingInfoService,
    private reservationsService: ReservationsService,
    private messageService: MessageService,
  ){
    this.rangeDates = [];

    this.info.customer_name = this.bookingInfoService.bookingInfo.customer_name;
    this.info.contact_no = this.bookingInfoService.bookingInfo.contact_no;
    this.info.email = this.bookingInfoService.bookingInfo.email;
  }

  nextPage() {
    // console.log(this.rangeDates[0].toLocaleDateString("en-US"));
    this.bookingInfoService.bookingInfo.customer_name = this.info.customer_name;
    this.bookingInfoService.bookingInfo.contact_no = this.info.contact_no;
    this.bookingInfoService.bookingInfo.email = this.info.email;
    this.bookingInfoService.bookingInfo.arrival = this.rangeDates[0].toLocaleDateString("en-US");
    console.log(this.rangeDates.length)
    console.log(this.rangeDates)
    if (this.rangeDates[1] !== null) {
      this.bookingInfoService.bookingInfo.departure = this.rangeDates[1].toLocaleDateString("en-US");
    }
    this.router.navigate(['book/accomodations']);
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

      type: 'individual',
    }

    this.reservationsService.checkReservationAvailability(payload).subscribe(
      (data: any) => {
        console.log(data)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The date range has some available rooms and time, Please click \'Next\' to Proceed' });
      }, (err: any) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Accomodation Reservation Unavailable, Please check other accomodation or change your date of stay. Thank you' });
      }
    );
  }

  filledUp(){
    return !this.info.customer_name || !this.info.contact_no || !this.info.email || (this.rangeDates == undefined || this.rangeDates.length == 0)
  }


}
