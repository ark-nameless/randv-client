import { Component } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ReservationsService } from 'src/app/apis/reservations.service';

@Component({
  selector: 'app-set-payment',
  templateUrl: './set-payment.component.html',
  styleUrls: ['./set-payment.component.css']
})
export class SetPaymentComponent {
  data: any = {};

  payload = {
    payed: false,
    payment: 0,
    total_amount: 0
  };

  reservationInfo: any = {};

  constructor(
    private dialogService: DialogService,
    public ref: DynamicDialogRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private reservationsService: ReservationsService,
    private dialogConfig: DynamicDialogConfig
  ) {
    this.data = dialogConfig.data;

    this.reservationsService.getReservation(this.data.id).subscribe(
      (response: any) => {
        this.reservationInfo = response;

        this.payload.payed = response.payed;
        this.payload.payment = response.payment;
        this.payload.total_amount = response.total_amount;
      }
    )
  }

  isFilledUp(){
    return this.payload.total_amount >= 0 && this.payload.payment >= 0;
  }

  setPayment() {
    if (this.isFilledUp()) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to Set payment for ' + this.data.customer_name + "'s reservation?",
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.reservationsService.setPayment(this.payload, this.reservationInfo.id).subscribe(
            (data) => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Set Payment for Reservation' });
              setTimeout(() => { this.ref.close() }, 3000)
            }, (err) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
              setTimeout(() => { this.ref.close() }, 3000)
            }
          )
        },
        reject: (type: any) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
              break;
            case ConfirmEventType.CANCEL:
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
              break;
          }
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill up all the fields' });
    }
  }

}
