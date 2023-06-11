import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PackagesService } from 'src/app/apis/packages.service';
import { ReservationsService } from 'src/app/apis/reservations.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ReservationsComponent {
}
