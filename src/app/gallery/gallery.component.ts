import { Component, OnInit } from '@angular/core';
import { IMAGES_LIST } from 'src/assets/images-list';
import { Lightbox, IAlbum } from 'ngx-lightbox';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  imagesList = IMAGES_LIST;
  lightboxImages: IAlbum[] = [];
  hoveredIndex = -1;

  constructor(private _lightbox: Lightbox) {}

  ngOnInit() {
    this.initializeLightbox();
  }

  initializeLightbox(): void {
    this.lightboxImages = this.imagesList.map(image => ({
      src: 'assets/photos/' + image.filename,
      caption: image.caption,
      thumb: 'assets/photos/' + image.filename // You can use the same image for thumb
    }));
  }

  open(index: number): void {
    this._lightbox.open(this.lightboxImages, index);
  }
}
