import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccomodationsService } from 'src/app/apis/accomodations.service';
import { EntraceFeesService } from 'src/app/apis/entrace-fees.service';
import { BookingInfoService } from 'src/app/services/booking-info.service';

@Component({
  selector: 'app-guest-entrace-info',
  templateUrl: './guest-entrace-info.component.html',
  styleUrls: ['./guest-entrace-info.component.css']
})
export class GuestEntraceInfoComponent {
  entraceFees: any = [];
  selectedAccomodations: any = [];

  constructor(
    private router: Router,
    private entraceFeeService: EntraceFeesService,
    private messageService: MessageService,
    private bookingInfoService: BookingInfoService,
  ) {

  }

  ngOnInit() {
    var list = this.bookingInfoService.bookingInfo.selected_entrace;

    this.entraceFeeService.getAllEntraceFees().subscribe((data) => {
      var withInput: any = [];
      data.forEach((e: any) => {
        withInput.push({
          id: e.id,
          name: e.name,
          notes: e.notes,
          day_fee: e.day_fee,
          night_fee: e.night_fee,

          reserveQuantity: 0,
          prices: [
            { type: 'day', label: 'Day Tour', price: e.day_fee },
            { type: 'night', label: 'Overnight', price: e.night_fee },
            // { label: '24 hrs', price: e.whole_day },
          ],
          selectedTime: ''
        });
        list.forEach((reserved: any) => {
          if (e.id === reserved.id){
            withInput[withInput.length - 1].reserveQuantity = reserved.reserveQuantity;
            withInput[withInput.length - 1].selectedTime = reserved.selectedTime;
          }
        });
      });

      this.entraceFees = withInput;
    });
  }

  selectItem(item: any) {
    this.bookingInfoService.bookingInfo.selected_entrace.push(item);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Guest type ${item.name} added to the List` });
  }

  inCart(id: any) {
    return this.bookingInfoService.bookingInfo.selected_entrace.filter((obj: any) => {
      return obj.id === id
    }).length > 0
  }

  removeFromCart(id: any) {
    var list = this.bookingInfoService.bookingInfo.selected_entrace;
    this.bookingInfoService.bookingInfo.selected_entrace = list.filter((obj: any) => {
      return obj.id !== id;
    })
  }

  prevPage() {
    this.router.navigate(['book/accomodations']);
  }

  nextPage() {
    this.router.navigate(['book/payment']);
  }
}
