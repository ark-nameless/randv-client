import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TermsOfServiceService } from 'src/app/services/terms-of-service.service';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [DialogService, ]
})
export class LandingPageComponent {
  
  ref: DynamicDialogRef = new DynamicDialogRef();
  
  constructor(
    private dialogService: DialogService, 
    private termsOfServiceService: TermsOfServiceService,
  ){
    if (!this.termsOfServiceService.hasShownTermsOfService()) {
      this.ref = this.dialogService.open(TermsOfServiceComponent, {
        header: 'Terms Of Service',
        width: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true
      })

      this.ref.onClose.subscribe( () => {
        this.termsOfServiceService.setTermsOfServiceShown();
      });
    }
  }
}
