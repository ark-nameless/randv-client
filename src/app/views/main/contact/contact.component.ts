import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FeedbacksService } from 'src/app/apis/feedbacks.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [MessageService]
})
export class ContactComponent {
  comment = ''

  constructor(
    private messageService: MessageService,
    private feedbackService: FeedbacksService,
  ) {

  }

  onSubmit() {
    
  }
}
