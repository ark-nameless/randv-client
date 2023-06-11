import { Component } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PackagesService } from 'src/app/apis/packages.service';
import { ReservationsService } from 'src/app/apis/reservations.service';

@Component({
  selector: 'app-view-cancel-request',
  templateUrl: './view-cancel-request.component.html',
  styleUrls: ['./view-cancel-request.component.css'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class ViewCancelRequestComponent {
  data: any = {};
  stateOptions: any[] = [{ label: 'Approve', value: 'approved' }, { label: 'Reject', value: 'rejected' }];

  payload = {
    refund_amount: 0,
    status: '',
    notes: ''
  };

  cancelRequest: any = {};
  cancelRequestId = '';

  selectedPackage: any = {};


  constructor(
    private dialogService: DialogService,
    public ref: DynamicDialogRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private reservationsService: ReservationsService,
    private packagesService: PackagesService,
    private dialogConfig: DynamicDialogConfig
  ) {
    this.data = dialogConfig.data.data;
    this.cancelRequestId = dialogConfig.data.id;

    this.reservationsService.getReservation(this.data.id).subscribe(
      (response: any) => {
        this.payload.status = response.status;
        this.cancelRequest = response;
        this.packagesService.getPackage(response.package_id).subscribe(
          (data: any) => this.selectedPackage = data
        )
      }
    )
  }

  isFilledUp(){
    return this.payload.status != 'actionable' && this.payload.notes;
  }

  cancelReservation(reservation: any) {
    if (this.isFilledUp()) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to refund ' + this.data.name + "'s reservation?",
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.reservationsService.cancelReservation(this.cancelRequestId, this.payload).subscribe(
            (data) => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Cancelled Reservation' });
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
