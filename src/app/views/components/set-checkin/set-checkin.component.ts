import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReservationsService } from 'src/app/apis/reservations.service';

@Component({
  selector: 'app-set-checkin',
  templateUrl: './set-checkin.component.html',
  styleUrls: ['./set-checkin.component.css'],
  providers: [MessageService, ]
})
export class SetCheckinComponent {
  payload = {
    guest_count: 0,
    address: ''
  }; 

  selectedProvince = {
    label: '',
    code: '',
  };

  reservation: any = {};

  provinces = [
    { label: "Abra", code: "Abra"},
    { label: "Agusan del Norte", code: "Agusan del Norte"},
    { label: "Agusan del Sur", code: "Agusan del Sur"},
    { label: "Aklan", code: "Aklan"},
    { label: "Albay", code: "Albay"},
    { label: "Antique", code: "Antique"},
    { label: "Apayao", code: "Apayao"},
    { label: "Aurora", code: "Aurora"},
    { label: "Basilan", code: "Basilan"},
    { label: "Bataan", code: "Bataan"},
    { label: "Batanes", code: "Batanes"},
    { label: "Batangas", code: "Batangas"},
    { label: "Benguet", code: "Benguet"},
    { label: "Biliran", code: "Biliran"},
    { label: "Bohol", code: "Bohol"},
    { label: "Bukidnon", code: "Bukidnon"},
    { label: "Bulacan", code: "Bulacan"},
    { label: "Cagayan", code: "Cagayan"},
    { label: "Camarines Norte", code: "Camarines Norte"},
    { label: "Camarines Sur", code: "Camarines Sur"},
    { label: "Camiguin", code: "Camiguin"},
    { label: "Capiz", code: "Capiz"},
    { label: "Catanduanes", code: "Catanduanes"},
    { label: "Cavite", code: "Cavite"},
    { label: "Cebu", code: "Cebu"},
    { label: "ColumnCount", code: "ColumnCount"},
    { label: "Cotabato", code: "Cotabato"},
    { label: "Davao de Oro", code: "Davao de Oro"},
    { label: "Davao del Norte", code: "Davao del Norte"},
    { label: "Davao del Sur", code: "Davao del Sur"},
    { label: "Davao Occidental", code: "Davao Occidental"},
    { label: "Davao Oriental", code: "Davao Oriental"},
    { label: "Dinagat Islands", code: "Dinagat Islands"},
    { label: "Eastern Samar", code: "Eastern Samar"},
    { label: "Guimaras", code: "Guimaras"},
    { label: "Ifugao", code: "Ifugao"},
    { label: "Ilocos Norte", code: "Ilocos Norte"},
    { label: "Ilocos Sur", code: "Ilocos Sur"},
    { label: "Iloilo", code: "Iloilo"},
    { label: "Isabela", code: "Isabela"},
    { label: "Kalinga", code: "Kalinga"},
    { label: "La Union", code: "La Union"},
    { label: "Laguna", code: "Laguna"},
    { label: "Lanao del Norte", code: "Lanao del Norte"},
    { label: "Lanao del Sur", code: "Lanao del Sur"},
    { label: "Leyte", code: "Leyte"},
    { label: "Maguindanao", code: "Maguindanao"},
    { label: "Marinduque", code: "Marinduque"},
    { label: "Masbate", code: "Masbate"},
    { label: "Metro Manila", code: "Metro Manila"},
    { label: "Misamis Occidental", code: "Misamis Occidental"},
    { label: "Misamis Oriental", code: "Misamis Oriental"},
    { label: "Mountain Province", code: "Mountain Province"},
    { label: "Negros Occidental", code: "Negros Occidental"},
    { label: "Negros Oriental", code: "Negros Oriental"},
    { label: "Northern Samar", code: "Northern Samar"},
    { label: "Nueva Ecija", code: "Nueva Ecija"},
    { label: "Nueva Vizcaya", code: "Nueva Vizcaya"},
    { label: "Oriental Mindoro", code: "Oriental Mindoro"},
    { label: "Palawan", code: "Palawan"},
    { label: "Pampanga", code: "Pampanga"},
    { label: "Pangasinan", code: "Pangasinan"},
    { label: "Province", code: "Province"},
    { label: "Quezon", code: "Quezon"},
    { label: "Quirino", code: "Quirino"},
    { label: "Rizal", code: "Rizal"},
    { label: "Romblon", code: "Romblon"},
    { label: "Samar", code: "Samar"},
    { label: "Sarangani", code: "Sarangani"},
    { label: "Siquijor", code: "Siquijor"},
    { label: "Sorsogon", code: "Sorsogon"},
    { label: "South Cotabato", code: "South Cotabato"},
    { label: "Southern Leyte", code: "Southern Leyte"},
    { label: "Sultan Kudarat", code: "Sultan Kudarat"},
    { label: "Sulu", code: "Sulu"},
    { label: "Surigao del Norte", code: "Surigao del Norte"},
    { label: "Surigao del Sur", code: "Surigao del Sur"},
    { label: "Tarlac", code: "Tarlac"},
    { label: "Tawi-Tawi", code: "Tawi-Tawi"},
    { label: "Zambales", code: "Zambales"},
    { label: "Zamboanga del Norte", code: "Zamboanga del Norte"},
    { label: "Zamboanga del Sur", code: "Zamboanga del Sur"},
    { label: "Zamboanga Sibugay", code: "Zamboanga Sibugay"},
  ]

  constructor (
    private messageService: MessageService,
    private reservationsService: ReservationsService,
    private dialogConfig: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ){
    this.reservation = dialogConfig.data;
  }

  
  setCheckedIn(reservation: any) {
    this.payload.address = this.selectedProvince.code;

    this.reservationsService.checkIn(reservation.id, this.payload).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Guests have checked in' });
        setTimeout(() => this.ref.close(), 3000);
      }, (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong'});
        setTimeout(() => this.ref.close(), 3000);
      }
    )
  }
}
