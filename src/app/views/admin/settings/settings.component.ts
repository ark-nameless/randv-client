import { Component, Injector } from '@angular/core';


import Quill from 'quill';
import ImageResize from 'quill-image-resize';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import { PackagesService } from 'src/app/apis/packages.service';
import { MessageService } from 'primeng/api';

Quill.register('modules/imageResize', ImageResize as any);


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [MessageService]
})
export class SettingsComponent {
  text: string = '';
  dayPrice: string = '';
  nightPrice: string = '';
  wholeDayPrice: string = '';

  modules = {}
  
  constructor(
    private messageService: MessageService,
    private packagesAPI: PackagesService
  ) {
    this.modules = {
      imageResize: {
      },
    };
  }

  onSubmit() {
    var data = {
      content: this.text,
      day_fee: parseInt(this.dayPrice) || 1,
      night_fee: parseInt(this.nightPrice) || 1,
      whole_day: parseInt(this.wholeDayPrice) || parseInt(this.dayPrice) + parseInt(this.nightPrice)
    };

    console.log('monster');

    if (data.content != '' && data.day_fee != 0 && data.night_fee != 0) {
      this.packagesAPI.createNewPackage(data).subscribe(
        (data) => {
          console.log()
        },
        (err) => {
          if (err.status === 403 && err.error.detail.search('validate credentials') != -1) {
            this.packagesAPI.createNewPackage(data).subscribe(data => {console.log(data)})
          } 
        }
      )
    } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill up all the fields' });
    }
  }
}
