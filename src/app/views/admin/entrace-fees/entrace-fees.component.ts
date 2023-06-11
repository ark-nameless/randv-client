import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewEntraceFeeComponent } from './new-entrace-fee/new-entrace-fee.component';
import { EntraceFeesService } from 'src/app/apis/entrace-fees.service';

interface EntranceFee {
  id: string
  name: string
  notes: string
  day_fee: number
  night_fee: number
  whole_day: number
}

@Component({
  selector: 'app-entrace-fees',
  templateUrl: './entrace-fees.component.html',
  styleUrls: ['./entrace-fees.component.css'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class EntraceFeesComponent {

  entranceFees: EntranceFee[] = [];
  ref: DynamicDialogRef = new DynamicDialogRef();

  clonedEntranceFees: { [s: string]: EntranceFee } = {};

  constructor(
    private entraceService: EntraceFeesService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
  ) {

  }

  ngOnInit() {
    this.entraceService.getAllEntraceFees().subscribe((data) => {
      this.entranceFees = data;
    });
  }

  onRowEditInit(entranceFee: EntranceFee) {
    this.clonedEntranceFees[entranceFee.id] = { ...entranceFee };
  }

  onRowEditSave(entranceFee: EntranceFee) {
    if (entranceFee.day_fee > 0 && entranceFee.night_fee && entranceFee.whole_day > 0) {
      this.entraceService.updateEntranceFee(entranceFee).subscribe(
        (data: any) => {
          delete this.clonedEntranceFees[entranceFee.id];
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Entrance Fee is updated' });
        }
      )
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Pricing' });
    }
  }

  onRowEditCancel(accomodation: EntranceFee, index: number) {
    this.entranceFees[index] = this.clonedEntranceFees[accomodation.id];
    delete this.clonedEntranceFees[accomodation.id];
  }

  onRowDelete(event: Event, entranceFee: EntranceFee, index: number) {
    const target = event.target || undefined;

    this.confirmationService.confirm({
      target: target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entraceService.removeEntranceFee(entranceFee.id).subscribe(
          (data: any) => {
            this.entranceFees[index] = this.clonedEntranceFees[entranceFee.id];
            delete this.clonedEntranceFees[entranceFee.id];
            delete this.entranceFees[index];
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Successfully Removed ' + entranceFee.name });
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

  newEntranceFee() {
    this.ref = this.dialogService.open(NewEntraceFeeComponent, {
      header: 'Create New Entrace Fee',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.ref.onClose.subscribe((entranceFee: any) => {
      if (entranceFee) {
        this.entranceFees.push(entranceFee);
        this.messageService.add({ severity: 'info', summary: 'Entrance Added', detail: entranceFee.name });
      }
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }
}
