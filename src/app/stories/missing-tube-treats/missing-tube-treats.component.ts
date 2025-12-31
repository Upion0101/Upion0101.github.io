import {
  Component,
  AfterViewInit,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-missing-tube-treats',
  templateUrl: './missing-tube-treats.component.html',
  styleUrls: ['./missing-tube-treats.component.scss']
})
export class MissingTubeTreatsComponent
  implements AfterViewInit, OnInit
{
  @ViewChild('storyContainer') storyContainer!: ElementRef;
  pawprints = new Array(10);

  activeClue: number | null = null;
  unlockedClues: Set<number> = new Set();

  // Quiz state
  showQuiz = false;
  selectedAnswer: string | null = null;
  answerCorrect: boolean | null = null;
  showFinalReveal = false;
  private correctAnswer = 'Bob';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  showClue(num: number) {
    this.activeClue = this.activeClue === num ? null : num;
    this.unlockedClues.add(num);

    if (this.unlockedClues.size === 5 && !this.showQuiz) {
      this.showQuiz = true;
    }
  }

  get clueProgressPercent(): number {
    return (this.unlockedClues.size / 5) * 100;
  }

  submitAnswer() {
    if (this.selectedAnswer === this.correctAnswer) {
      this.answerCorrect = true;
      this.showFinalReveal = true;
      this.renderer.addClass(document.body, 'case-solved');
    } else {
      this.answerCorrect = false;
    }
  }

  ngAfterViewInit(): void {
    const tl = gsap.timeline();
    tl.from('.story-title', {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    })
      .to('.clue', {
        opacity: 1,
        stagger: 0.5,
        duration: 0.6,
        ease: 'power2.inOut'
      });

    gsap.to('.paw', {
      scrollTrigger: {
        trigger: '.paw-trail',
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out'
    });
  }
}
