import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { PackagesService } from 'src/app/apis/packages.service';
import { ReservationsService } from 'src/app/apis/reservations.service';
import { SetCheckinComponent } from 'src/app/views/components/set-checkin/set-checkin.component';

@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.css'],
  providers: [MessageService, ConfirmationService, ConfirmationService, DialogService, ]
})
export class AllReservationsComponent {

  reservations: any = [];
  cols: any = [];
  _selectedColumns: any = [];
  selectedReservation: any = {};
  loading: boolean = true;

  items: MenuItem[] = [];

  ref: DynamicDialogRef = new DynamicDialogRef();
  
  constructor(
    private router: Router,
    private messageService: MessageService,
    private packagesAPI: PackagesService,
    private reservationsService: ReservationsService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
  ) {

  }

  ngOnInit() {
    this.reservationsService.getAllReservations().subscribe((data) => {
      this.reservations = data;
      this.loading = false;
    });

    this.items = [
      { label: 'Checked In', icon: 'pi pi-fw pi-sign-in', command: () => this.setCheckIn(this.selectedReservation) },
      { label: 'Check Out', icon: 'pi pi-fw pi-sign-out', command: () => this.setCheckOut(this.selectedReservation) },
    ];

    this.cols = [
      { field: 'customer_name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'contact_no', header: 'Contact No' },
      { field: 'reference_no', header: 'Reference No' },
      { field: 'checked_in', header: 'Check In' },
      { field: 'checkout', header: 'Check Out' },
    ];

    this._selectedColumns = this.cols;
  }

  setCheckedIn(reservation: any) {
    this.reservationsService.checkIn(reservation.id, '').subscribe(
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

  setCheckIn(reservation: any) {
    this.ref = this.dialogService.open(SetCheckinComponent, {
      data: reservation,
      header: 'Set Check In',
      width: '70%',
      height: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    })
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
