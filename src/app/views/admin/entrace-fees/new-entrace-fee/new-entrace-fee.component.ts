import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { EntraceFeesService } from 'src/app/apis/entrace-fees.service';

@Component({
  selector: 'app-new-entrace-fee',
  templateUrl: './new-entrace-fee.component.html',
  styleUrls: ['./new-entrace-fee.component.css']
})
export class NewEntraceFeeComponent {


  entranceFee =  {
    name: '',
    notes: '',
    day_fee: 0,
    night_fee: 0,
    whole_day: 0,
  }

  newEntrancenFee = {};

  constructor(
    private entranceFeeService: EntraceFeesService, 
    public ref: DynamicDialogRef,
    private messageService: MessageService,
  ) {}

  ngOnInit() {

  }

  createNewEntranceFee() {
    this.entranceFeeService.createNewEntraceFee(this.entranceFee).subscribe(
      (data: any) => {
        let val = {
          name: data.name,
          notes: data.notes,
          day_fee: data.day_fee,
          night_fee: data.night_fee,
          whole_day: data.whole_day,
          id: data.id,
        };
        
        this.messageService.add({ severity: 'success', summary: 'Entrace Fee Added', detail: `${data.name} Added.` });
        setTimeout(() => this.ref.close(val), 3000);
      }
    )
  }

}
