import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FeedbacksService } from 'src/app/apis/feedbacks.service';
import { ReservationsService } from 'src/app/apis/reservations.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  providers: [MessageService, ]
})
export class ReviewComponent {
  comment = '';
  ratings = 0;
  reservationId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private feedbackService: FeedbacksService,
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

  isFilledUp() {
    return this.comment && this.ratings != 0;
  }

  onSubmit() {
    if (this.isFilledUp()){
      let payload = {
        reservation_id: this.reservationId,
        review: this.comment,
        rating: this.ratings,
      }
      console.log(payload);
      this.feedbackService.createNewReview(payload).subscribe(
        (data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Review successfully sent' });
          this.comment = '';
          this.ratings = 0;
          setTimeout(() => this.router.navigate(['/']), 3000);
        }
      )
    }
  }
}
