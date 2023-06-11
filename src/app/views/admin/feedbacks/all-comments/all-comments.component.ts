import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FeedbacksService } from 'src/app/apis/feedbacks.service';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AllCommentsComponent {
  comments: any = [];
  selectedComment: any = {};
  cols: any = [];
  _selectedColumns: any = [];
  loading: boolean = true;

  items: MenuItem[] = [];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private feedbackService: FeedbacksService,
  ) {

  }

  ngOnInit() {
    this.feedbackService.getAllComments().subscribe((data) => {
      this.comments = data;
      this.loading = false;
    });

    this.items = [
      // { label: 'Checked In', icon: 'pi pi-fw pi-sign-in', command: () => this.setCheckedIn(this.selectedReservation) },
      // { label: 'Check Out', icon: 'pi pi-fw pi-sign-out', command: () => this.setCheckOut(this.selectedReservation) },
      // { label: 'Paid', icon: 'pi pi-fw pi-money-bill', command: () => this.togglePaid(this.selectedReservation) },
    ];

    this.cols = [
      // { field: 'reservation_id', header: 'ID' },
      { field: 'comment', header: 'Comments' },
    ];

    this._selectedColumns = this.cols;
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
    this.feedbackService.getAllReviews().subscribe((data) => {
      this.comments = data;
      this.loading = false;
    });
  }
}
