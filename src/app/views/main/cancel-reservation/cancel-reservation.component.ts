import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ReservationsService } from 'src/app/apis/reservations.service';

@Component({
  selector: 'app-cancel-reservation',
  templateUrl: './cancel-reservation.component.html',
  styleUrls: ['./cancel-reservation.component.css'],
  providers: [MessageService]
})
export class CancelReservationComponent {

  comment = ''
  reservationId = ''

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private reservationService: ReservationsService,
  ) {
    this.reservationId = this.route.snapshot.params['id'];

    this.reservationService.checkIfValidReservationId(this.reservationId).subscribe(
      (data) => {
        
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Sorry, it seems like your Reservation ID is invalid, please check the reservation email that we've sent you and click the cancel reservation to send apply for reservation cancellation."});
        setTimeout(() => { this.router.navigate(['/']) }, 5000)
      }
    );
  }

  ngOnInit(){
  }

  
  onSubmit() {
    let payload = {
      reservation_id: this.reservationId,
      reason: this.comment,
    }
    this.reservationService.sendCancellationRequest(payload).subscribe(
      (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Sent', detail: "Please wait for our email that we'll sent to you regarding to your cancellation. Thank you"});
        setTimeout(() => this.router.navigate(['/']), 5000);
      }, 
      (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail});
        setTimeout(() => this.router.navigate(['/']), 5000);
      }
    )
  }
}
