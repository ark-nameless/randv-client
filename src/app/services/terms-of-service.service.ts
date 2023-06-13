import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TermsOfServiceService {
  private readonly storageKey = 'termsOfServiceShown';

  hasShownTermsOfService(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }

  setTermsOfServiceShown() {
    localStorage.setItem(this.storageKey, 'true');
  }
}
