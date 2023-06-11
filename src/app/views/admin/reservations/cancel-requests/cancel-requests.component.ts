import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { PackagesService } from 'src/app/apis/packages.service';
import { ReservationsService } from 'src/app/apis/reservations.service';
import { ViewCancelRequestComponent } from '../view-cancel-request/view-cancel-request.component';


class CancelRequest {
  id: string | undefined
  reservation_id: string | undefined
  reason: string | undefined
  status: string | undefined
  notes: string | undefined
}


@Component({
  selector: 'app-cancel-requests',
  templateUrl: './cancel-requests.component.html',
  styleUrls: ['./cancel-requests.component.css'],
  providers: [MessageService, DialogService,]
})
export class CancelRequestsComponent {

  cols: any = [];
  _selectedColumns: any = [];
  selectedReservation: any = {};
  loading: boolean = true;

  items: MenuItem[] = [];

  cancelRequest: any = [];
  reservationData = {
    id: '',
    name: '',
    email: '',
    contactNo: '',
    total: 0,
    checkin: '',
    checkout: '',
    referenceNo: '',
  }
  cancelRequestID = '';

  ref: DynamicDialogRef = new DynamicDialogRef();

  constructor(
    private router: Router,
    private messageService: MessageService,
    private packagesAPI: PackagesService,
    private reservationsService: ReservationsService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit() {
    this.reservationsService.getAllCancellationRequest().subscribe((data) => {
      this.cancelRequest = data;
      this.loading = false;
    });

    this.items = [
      { label: 'Get Details', icon: 'pi pi-fw pi-money-bill', command: () => this.getReservationDetail(this.selectedReservation) },
      { label: 'Cancel Reservation', icon: 'pi pi-fw pi-ban', command: () => this.viewCancelDialog(this.reservationData) },
      // { label: 'Cancel Reservation', icon: 'pi pi-fw pi-ban', command: () => this.cancelReservation(this.selectedReservation) },
    ];

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'reservation_id', header: 'Reservation ID' },
      { field: 'reason', header: 'Reason for Cancellation' },
      { field: 'status', header: 'Status' },
      { field: 'notes', header: 'Notes' },
      // "refund_amount": 0
    ];

    this._selectedColumns = this.cols;
  }

  viewCancelDialog(request: any) {
    console.log(request);
    this.ref = this.dialogService.open(ViewCancelRequestComponent, {
      data: {
        data: request,
        id: this.cancelRequestID,
      },
      header: 'Cancel Reservation',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    })
  }

  getReservationDetail(cancelRequest: any) {
    this.cancelRequestID = cancelRequest.id;
    this.reservationsService.getReservation(cancelRequest.reservation_id).subscribe(
      (data: any) => {
        this.reservationData = {
          id: data.id,
          name: data.customer_name,
          email: data.email,
          contactNo: data.contact_no,
          total: data.total_amount,
          checkin: data.arrival,
          checkout: data.departure,
          referenceNo: data.reference_no,
        }
        console.log(data);
      }
    )
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
  }

  clear(table: Table) {
    table.clear();
    this.reservationsService.getAllCancellationRequest().subscribe((data) => {
      this.cancelRequest = data;
      this.loading = false;
    });
  }


}
