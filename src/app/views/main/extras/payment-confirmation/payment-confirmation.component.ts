import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ReservationsService } from 'src/app/apis/reservations.service';
import { BookingInfoService } from 'src/app/services/booking-info.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css'],
  providers: [MessageService]
})
export class PaymentConfirmationComponent {
  bookInfo: any = [];
  selectedAccomodations: any = [];
  selectedEntraceFees: any = [];

  grandTotal: any = 0;
  referenceNo: any = '';

  constructor(
    private router: Router,
    private bookingInfoService: BookingInfoService,
    private reservationsService: ReservationsService,
    private messageService: MessageService,
  ) {
    this.selectedAccomodations = bookingInfoService.bookingInfo.selected_accomodations;
    this.selectedEntraceFees = bookingInfoService.bookingInfo.selected_entrace;
    this.bookInfo = bookingInfoService.bookingInfo;

    this.selectedAccomodations.forEach((e: any) => {
      var multiplier = 1;
      if (this.bookInfo.departure !== '') {
        var start = new Date(this.bookInfo.arrival);
        var end = new Date(this.bookInfo.departure);
        var diff = Math.abs(start.getTime() - end.getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
        multiplier += diffDays
      }

      var plan = e.prices.filter((v: any) => v.type === e.selectedTime)[0];
      e.selectedPlan = plan;
      e.total = plan.price * e.reserveQuantity * multiplier;
      this.grandTotal += e.total * e.reserveQuantity
    })

    this.selectedEntraceFees.forEach((e: any) => {
      var plan = e.prices.filter((v: any) => v.type === e.selectedTime)[0];
      e.selectedPlan = plan;
      e.total = plan.price * e.reserveQuantity;
      this.grandTotal += e.total;
    })
  }

  prevPage() {
    this.router.navigate(['book/guests']);
  }

  onSubmit() {
    var payload = {
      arrival: this.bookInfo.arrival,
      contact_no: this.bookInfo.contact_no,
      customer_name: this.bookInfo.customer_name,
      departure: this.bookInfo.departure,
      email: this.bookInfo.email,
      selected_accomodations: this.selectedAccomodations,
      selected_entrace: this.selectedEntraceFees,
      total_amount: this.grandTotal,
      reference_no: this.referenceNo
    }

    if (payload.customer_name != '' && payload.total_amount != 0 && 
        payload.contact_no != '' && payload.email != '') {
      this.reservationsService.createNewIndividualReservation(payload).subscribe(
        (data) => {
          console.log();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your Reservation is successful, please wait for the email that we will send you. Thank you' });
          setTimeout(() => {this.router.navigate(['/'])}, 3000);
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
