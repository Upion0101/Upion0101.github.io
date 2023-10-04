import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { IMAGES_LIST } from '../../assets/images-list';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  imageUrls: string[] = [];
  private readonly basePath = 'photos/'; // replace with your actual path
  private readonly maxImages = 8;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    const shuffledImages = shuffleArray([...IMAGES_LIST]);
    const randomImages = shuffledImages.slice(0, this.maxImages);
    
    randomImages.forEach(imageName => {
      const imagePath = this.basePath + imageName;
      this.storageService.getDownloadURL(imagePath).then(url => {
        this.imageUrls.push(url);
      });
    });
  }
}

function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}