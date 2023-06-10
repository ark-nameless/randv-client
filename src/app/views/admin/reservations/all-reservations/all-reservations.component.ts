import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Table } from 'primeng/table';
import { PackagesService } from 'src/app/apis/packages.service';
import { ReservationsService } from 'src/app/apis/reservations.service';

@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.css']
})
export class AllReservationsComponent {

  reservations: any = [];
  cols: any = [];
  _selectedColumns: any = [];
  selectedReservation: any = {};
  loading: boolean = true;

  items: MenuItem[] = [];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private packagesAPI: PackagesService,
    private reservationsService: ReservationsService,
    private confirmationService: ConfirmationService,
  ) {

  }

  ngOnInit() {
    this.reservationsService.getAllReservations().subscribe((data) => {
      this.reservations = data;
      this.loading = false;
    });

    this.items = [
      { label: 'Checked In', icon: 'pi pi-fw pi-sign-in', command: () => this.setCheckedIn(this.selectedReservation) },
      { label: 'Check Out', icon: 'pi pi-fw pi-sign-out', command: () => this.setCheckOut(this.selectedReservation) },
      { label: 'Cancel Reservation', icon: 'pi pi-fw pi-ban', command: () => this.cancelReservation(this.selectedReservation) },
      { label: 'Paid', icon: 'pi pi-fw pi-money-bill', command: () => this.togglePaid(this.selectedReservation) },
    ];

    this.cols = [
      { field: 'customer_name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'contact_no', header: 'Contact No' },
      { field: 'reference_no', header: 'Reference No' },
      { field: 'checked_in', header: 'Check In' },
      { field: 'checkout', header: 'Check Out' },
      { field: 'payed', header: 'Is Paid' },
      // { field: 'payment', header: 'Paid' },
      { field: 'status', header: 'Status' },
      { field: 'total_amount', header: 'Total Amount' },
    ];

    this._selectedColumns = this.cols;
  }

  setCheckedIn(reservation: any) {
    this.reservationsService.checkIn(reservation.id).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Guests have checked in' });
        setTimeout(() => { this.router.navigate([this.router.url]) }, 3000)
      }, (err) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    )
  }

  setCheckOut(reservation: any) {
    this.reservationsService.checkOut(reservation.id).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Guests have checked out' });
        setTimeout(() => { this.router.navigate([this.router.url]) }, 3000)
      }, (err) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    )
  }

  cancelReservation(reservation: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel ' + reservation.customer_name + "'s reservation?",
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.reservationsService.cancelReservation(reservation.id).subscribe(
          (data) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Cancelled Reservation' });
            setTimeout(() => { this.router.navigate([this.router.url]) }, 3000)
          }, (err) => {
            console.log(err)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
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
  }

  togglePaid(reservation: any) {
    this.confirmationService.confirm({
      message: 'Are you sure ' + reservation.customer_name + "'s payment is complete?",
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.reservationsService.togglePaid(reservation.id).subscribe(
          (data) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully changed payment status' });
            setTimeout(() => { this.router.navigate([this.router.url]) }, 3000)
          }, (err) => {
            console.log(err)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
          }
        )
        setTimeout(() => { window.location.reload() }, 3000)
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
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
  }

  clear(table: Table) {
    table.clear();
    this.reservationsService.getAllReservations().subscribe((data) => {
      this.reservations = data;
      this.loading = false;
    });
  }


}
