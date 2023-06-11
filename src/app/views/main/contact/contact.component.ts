import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FeedbacksService } from 'src/app/apis/feedbacks.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [MessageService]
})
export class ContactComponent {
  comment = '';

  constructor(
    private router: Router,
    private messageService: MessageService,
    private feedbackService: FeedbacksService,
  ) {

  }

  isFilledUp() {
    return this.comment;
  }

  onSubmit() {
    if (this.isFilledUp()){
      let payload = {
        comment: this.comment,
      }
      this.feedbackService.createNewComment(payload).subscribe(
        (data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comment successfully sent' });
          this.comment = '';
          setTimeout(() => this.router.navigate(['/']), 3000);
        }
      )
    }
  }
}
