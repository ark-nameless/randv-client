import { Component } from '@angular/core';
import { PhotoService } from 'src/app/services/photo-service.service';

@Component({
  selector: 'app-amneties',
  templateUrl: './amneties.component.html',
  styleUrls: ['./amneties.component.css']
})
export class AmnetiesComponent {
  images: any[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.images = this.photoService.getImages();
  }
}
