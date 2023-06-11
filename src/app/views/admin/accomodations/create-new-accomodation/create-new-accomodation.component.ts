import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccomodationsService } from 'src/app/apis/accomodations.service';

@Component({
  selector: 'app-create-new-accomodation',
  templateUrl: './create-new-accomodation.component.html',
  styleUrls: ['./create-new-accomodation.component.css'],
  providers: [MessageService, ],
})
export class CreateNewAccomodationComponent {

  accomodation =  {
    name: '',
    capacity: 0,
    maximum: 0,
    quantity: 0,
    day_fee: 0,
    night_fee: 0,
    whole_day: 0,
  }

  newAccomodation = {};

  constructor(
    private accomodationService: AccomodationsService, 
    public ref: DynamicDialogRef,
    private messageService: MessageService,
  ) {}

  ngOnInit() {

  }

  createNewAccomodation() {
    this.accomodationService.createNewAccomodation(this.accomodation).subscribe(
      (data: any) => {
        let val = {
          name: data.name,
          capacity: data.capacity,
          maximum: data.maximum,
          quantity: data.quantity,
          day_fee: data.day_fee,
          night_fee: data.night_fee,
          whole_day: data.whole_day,
          id: data.id,
        };
        
        this.messageService.add({ severity: 'success', summary: 'Accomodation Added', detail: `${data.name} Accomodation Added.` });
        setTimeout(() => this.ref.close(val), 3000);
      }
    )
  }


}
