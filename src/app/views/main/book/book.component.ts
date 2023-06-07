import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AccomodationsService } from 'src/app/apis/accomodations.service';
import { BookingInfoService } from 'src/app/services/booking-info.service';



interface Item {
  label: string;
  quantity: number;
  editing: boolean;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [MessageService]
})
export class BookComponent implements OnInit {
  accomodations: any = [];
  items: MenuItem[] = [];
  subscription: Subscription = new Subscription();

  selectedAccomodations: any = [];

  constructor(
    private accomodationService: AccomodationsService, 
    private messageService: MessageService,
    private bookingInfoService: BookingInfoService,
    ) { 

    }

  ngOnInit() {
    this.accomodationService.getAllAccomodations().subscribe((data) => {
      // this.accomodations = data;

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
            { label: 'Day Tour', price: e.day_fee },
            { label: 'Overnight', price: e.night_fee },
            { label: '24 hrs', price: e.whole_day },
          ],
          // sliderStep: 100 / quantity,
          selectedTime: 0
        });
      });

      this.accomodations = withInput;

      console.log(this.accomodations);
    });

    this.items = [
      {
          label: 'Customer Info',
          routerLink: 'customers'
      },
      {
          label: 'Accomodations',
          routerLink: 'accomodations'
      },
      {
          label: 'Guests',
          routerLink: 'guests'
      },
      {
          label: 'Payment Confirmation',
          routerLink: 'payment'
      }
    ];
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }

  selectItem(item: any) {
    this.selectedAccomodations.push(item);

    console.log(this.selectedAccomodations);
  }

}
