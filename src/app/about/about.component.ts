import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  sections = [
    {
      image: '/assets/about_me/initial.png',
      alt: 'Bob being mysterious',
      bgColor: '#FFEBEE',
      fgColor: '#004D40',
      text: `Hey there, I’m Bob, but I’ve gone by a few names in my time. You see, I’m quite the mysterious kitty.
             My original name was “Miming,” but somewhere along the way, I decided “Bob” suited me better.`
    },
    {
      image: '/assets/about_me/bday.jpg',
      alt: 'Bob birthday celebration',
      bgColor: '#FFF3E0',
      fgColor: '#5D4037',
      text: `I celebrate my birthday on February 25th, but nobody really knows when I was born.
             I just wandered into a hospital and that day, February 25th, was where my incredible journey began.
             Luckily, my owner’s dad found me and brought me to my forever home.`
    },
    {
      image: '/assets/about_me/pretty.jpg',
      alt: 'Bob looking majestic',
      bgColor: '#E8F5E9',
      fgColor: '#1B5E20',
      text: `I may look majestic with my regal demeanor and majestic whiskers, but don’t let that fool you—I’m a playful and talkative kitty as well!
             I love playtime with my humans.
             Sometimes, I even have a play fights with another cat in the house, Adoba, who we also call “Poopy.”
             We keep things interesting around here!`
    },
    {
      image: '/assets/about_me/fighting.jpg',
      alt: 'Bob fighting Poopy',
      bgColor: '#E3F2FD',
      fgColor: '#0D47A1',
      text: `One thing you should know about me—I may be declawed (thanks to a previous owner), but I can still hold my own in a fight!
             I’m also quite the chatterbox and always have something to say.`
    },
    {
      image: '/assets/about_me/eating.jpg',
      alt: 'Bob enjoying wet food',
      bgColor: '#F3E5F5',
      fgColor: '#4A148C',
      text: `When it comes to food, I’m a bit of a connoisseur. I’m extremely picky, and my absolute favorite is wet food, especially the kind with plenty of gravy. Yum!`
    },
    {
      image: '/assets/about_me/window.jpg',
      alt: 'Bob sunbathing',
      bgColor: '#FFFDE7',
      fgColor: '#F57F17',
      text: `On sunny days, you’ll often find me perched on a windowsill, basking in the sunlight. Sunbathing is one of my guilty pleasures.`
    },
    {
      image: '/assets/about_me/drinking.jpg',
      alt: 'Bob drinking from a human cup',
      bgColor: '#E0F7FA',
      fgColor: '#006064',
      text: `Oh, and let’s talk about my favorite place to drink water from—the human cups. I like to take a sip from them when I’m feeling fancy.`
    },
    {
      image: '/assets/about_me/attitude.jpg',
      alt: 'Bob with an attitude',
      bgColor: '#FCE4EC',
      fgColor: '#880E4F',
      text: `But here’s the thing—don’t be late getting home to me.
             I might have a bit of an attitude when you arrive home late.
             I just like to keep my humans on their toes, you know?`
    },
    {
      image: '/assets/about_me/magestic.jpg',
      alt: 'Bob the Majestic Feline',
      bgColor: '#F1F8E9',
      fgColor: '#33691E',
      text: `So there you have it, a glimpse into the life of yours truly, Bob the Majestic Feline.
             Thanks for visiting my page, and feel free to follow along with my adventures! 😸🐾`
    }
  ];

  ngOnInit() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const elements = document.querySelectorAll('.about-section');
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        element.classList.add('visible');
      }
    });
  }
}
