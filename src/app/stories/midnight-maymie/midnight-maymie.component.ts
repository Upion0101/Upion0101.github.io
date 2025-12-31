import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-midnight-maymie',
  templateUrl: './midnight-maymie.component.html',
  styleUrls: ['./midnight-maymie.component.scss']
})
export class MidnightMaymieComponent implements OnInit {
  scene = 1;

  ngOnInit() {
    this.autoAdvance();
  }

  autoAdvance() {
    setTimeout(() => {
      if (this.scene < 7) { 
        this.scene++;
        this.autoAdvance();
      }
    }, 4000);
  }
  
}
