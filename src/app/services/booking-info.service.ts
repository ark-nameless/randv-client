import { Injectable } from '@angular/core';
import BookingInfo from '../models/booking-info.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingInfoService {

  public bookingInfo: BookingInfo;

  constructor() {
    this.bookingInfo = new BookingInfo();
  }
  
};

