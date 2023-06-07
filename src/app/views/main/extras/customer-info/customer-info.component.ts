import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingInfoService } from 'src/app/services/booking-info.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
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
    console.log('to implement')
  }

  filledUp(){
    return !this.info.customer_name || !this.info.contact_no || !this.info.email || (this.rangeDates == undefined || this.rangeDates.length == 0)
  }


}
