import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccomodationsService } from 'src/app/apis/accomodations.service';
import { CreateNewAccomodationComponent } from './create-new-accomodation/create-new-accomodation.component';


interface Accomodation {
  id: string
  name: string
  capacity: number
  maximum: number
  quantity: number
  day_fee: number
  night_fee: number
  whole_day: number
}


@Component({
  selector: 'app-accomodations',
  templateUrl: './accomodations.component.html',
  styleUrls: ['./accomodations.component.css'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class AccomodationsComponent {

  accomodations: Accomodation[] = [];
  ref: DynamicDialogRef = new DynamicDialogRef();

  clonedAccomodations: { [s: string]: Accomodation } = {};

  constructor(
    private accomodationsService: AccomodationsService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
  ) {

  }

  ngOnInit() {
    this.accomodationsService.getAllAccomodations().subscribe((data) => {
      this.accomodations = data;
    });
  }

  onRowEditInit(accomodation: Accomodation) {
    this.clonedAccomodations[accomodation.id] = { ...accomodation };
  }

  onRowEditSave(accomodation: Accomodation) {
    if (accomodation.day_fee > 0 && accomodation.night_fee && accomodation.whole_day > 0) {
      this.accomodationsService.updateAccomodation(accomodation).subscribe(
        (data: any) => {
          delete this.clonedAccomodations[accomodation.id];
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Accomodation is updated' });
        }
      )
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Pricing' });
    }
  }

  onRowEditCancel(accomodation: Accomodation, index: number) {
    this.accomodations[index] = this.clonedAccomodations[accomodation.id];
    delete this.clonedAccomodations[accomodation.id];
  }

  onRowDelete(event: Event, accomodation: Accomodation, index: number) {
    const target = event.target || undefined;

    this.confirmationService.confirm({
      target: target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accomodationsService.removeAccomodation(accomodation.id).subscribe(
          (data: any) => {
            this.accomodations[index] = this.clonedAccomodations[accomodation.id];
            delete this.clonedAccomodations[accomodation.id];
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Successfully Removed ' + accomodation.name });
          }
        )
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
  });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  newAccomodation() {
    this.ref = this.dialogService.open(CreateNewAccomodationComponent, {
      header: 'Create New Accomodation',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.ref.onClose.subscribe((accomodation: any) => {
      if (accomodation) {
        this.accomodations.push(accomodation);
        this.messageService.add({ severity: 'info', summary: 'Accomodation Added', detail: accomodation.name });
      }
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }
}