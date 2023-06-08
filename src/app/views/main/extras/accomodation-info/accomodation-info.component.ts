import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccomodationsService } from 'src/app/apis/accomodations.service';
import { ReservationsService } from 'src/app/apis/reservations.service';
import { BookingInfoService } from 'src/app/services/booking-info.service';

@Component({
  selector: 'app-accomodation-info',
  templateUrl: './accomodation-info.component.html',
  styleUrls: ['./accomodation-info.component.css']
})
export class AccomodationInfoComponent {
  accomodations: any = [];
  selectedAccomodations: any = [];

  constructor(
    private router: Router,
    private accomodationService: AccomodationsService,
    private messageService: MessageService,
    private bookingInfoService: BookingInfoService,
    private reservationsService: ReservationsService,
  ) {

  }

  ngOnInit() {
    var list = this.bookingInfoService.bookingInfo.selected_accomodations;

    this.accomodationService.getAllAccomodations().subscribe((data) => {
      var withInput: any = [];
      data.forEach((e: any) => {
        withInput.push({
          capacity: e.capacity,
          day_fee: e.day_fee,
          id: e.id,
          maximum: e.maximum,
          name: e.name,
          night_fee: e.night_fee,
          quantity: e.quantity,
          whole_day: e.whole_day,

          reserveQuantity: 0,
          prices: [
            { type: 'day', label: 'Day Tour', price: e.day_fee },
            { type: 'night', label: 'Overnight', price: e.night_fee },
            { type: 'whole', label: '24 hrs', price: e.whole_day },
          ],
          selectedTime: 0
        });
        list.forEach((reserved: any) => {
          if (e.id === reserved.id){
            withInput[withInput.length - 1].reserveQuantity = reserved.reserveQuantity;
            withInput[withInput.length - 1].selectedTime = reserved.selectedTime;
          }
        });
      });

      this.accomodations = withInput;
    });
  }

  selectItem(item: any) {
    this.bookingInfoService.bookingInfo.selected_accomodations.push(item);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Accomodation ${item.name} added to the List` });
  }

  inCart(id: any) {
    return this.bookingInfoService.bookingInfo.selected_accomodations.filter((obj: any) => {
      return obj.id === id
    }).length > 0
  }

  removeFromCart(id: any) {
    var list = this.bookingInfoService.bookingInfo.selected_accomodations;
    this.bookingInfoService.bookingInfo.selected_accomodations = list.filter((obj: any) => {
      return obj.id !== id;
    })
  }

  prevPage() {
    this.router.navigate(['book/customers']);
  }

  nextPage() {
    this.router.navigate(['book/guests']);
  }
  
  checkAvailability() {
    var info = this.bookingInfoService.bookingInfo;


    var payload = {
      customer_name: info.customer_name,
      email: info.email,
      contact_no: info.contact_no,

      arrival: info.arrival,
      departure: info.departure,

      selected_accomodations: info.selected_accomodations,
      type: 'individual',
    }

    this.reservationsService.checkReservationAvailability(payload).subscribe(
      (data: any) => {
        console.log(data)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your Reservation is Available, You can Proceed to click \'Next\'' });
      }, (err: any) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Accomodation Reservation Unavailable, Please check other accomodation or change your date of stay. Thank you' });
      }
    );
  }
  
}
