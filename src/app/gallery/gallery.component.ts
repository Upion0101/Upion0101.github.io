import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { IMAGES_LIST } from 'src/app/gallery/images-list';

declare global {
  interface Window { lightbox?: any; }
}

export interface GalleryImage {
  filename: string;
  caption: string;
  isZoomed: boolean;      // your original field; kept for compatibility
  focus?: string;         // optional: e.g., '50% 30%' to adjust crop focal point
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, AfterViewInit {
  imagesList: GalleryImage[] = IMAGES_LIST as GalleryImage[];
  hoveredIndex = -1;

  private lightboxReady = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.ensureLightbox2();
  }

  ngAfterViewInit(): void {
    // Optional: open an image if the URL hash matches a filename, e.g. /gallery#bob1.jpg
    this.openFromHashIfAny();
  }

  trackByFile = (_: number, img: GalleryImage) => img?.filename ?? _;

  photoUrl = (filename: string) => `assets/photos/${filename}`;

  // If you add real thumbnails later, just change this to assets/photos/thumbs/...
  thumbUrl = (filename: string) => this.photoUrl(filename);

  prefetchNeighbors(i: number) {
    const preload = (idx: number) => {
      if (idx >= 0 && idx < this.imagesList.length) {
        const url = this.photoUrl(this.imagesList[idx].filename);
        const img = new Image();
        img.src = url;
      }
    };
    preload(i + 1);
    preload(i - 1);
  }

  /* ---- Lightbox2 safe loader (prevents double-injection) ---- */
  private ensureLightbox2() {
    if (this.lightboxReady || window.lightbox) {
      this.configureLightbox();
      return;
    }

    const cssHref = 'assets/css/lightbox.min.css';
    const jsSrc  = 'assets/js/lightbox.min.js';

    // Inject CSS once
    if (!document.querySelector(`link[href="${cssHref}"]`)) {
      const link = this.renderer.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssHref;
      this.renderer.appendChild(document.head, link);
    }

    // Inject JS once
    const hasScript = Array.from(document.scripts).some(s => s.src?.includes('lightbox.min.js'));
    if (!hasScript) {
      const script = this.renderer.createElement('script');
      script.src = jsSrc;
      script.onload = () => this.configureLightbox();
      this.renderer.appendChild(document.body, script);
    } else {
      // Script tag exists; configure in a microtask (in case it’s still parsing)
      queueMicrotask(() => this.configureLightbox());
    }
  }

  private configureLightbox() {
    try {
      window.lightbox?.option({
        resizeDuration: 200,
        wrapAround: true,
        positionFromTop: 70,
        fadeDuration: 180,
        imageFadeDuration: 180
      });
      this.lightboxReady = true;
    } catch {
      // If Lightbox hasn't attached yet, it will still work with defaults later.
    }
  }

  /* ---- Optional: deep-link to a specific image by #filename ---- */
  private openFromHashIfAny() {
    const raw = window.location.hash?.replace(/^#/, '');
    if (!raw) return;

    const idx = this.imagesList.findIndex(i => i.filename === decodeURIComponent(raw));
    if (idx < 0) return;

    // Wait a tick so the DOM for *ngFor exists, then "click" the anchor
    setTimeout(() => {
      const el = document.querySelector(`a[data-filename="${CSS.escape(this.imagesList[idx].filename)}"]`) as HTMLAnchorElement | null;
      el?.click();
    }, 0);
  }
}
