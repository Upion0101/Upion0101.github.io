import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  faqs = [
    {
      question: 'Is she a maymie?',
      answer: 'Absolutely! She is a maymie lady.',
      show: false
    },
    {
      question: 'Is she a baby?',
      answer: 'Yes, her name is Baby World.',
      show: false
    },
    {
      question: 'Can you air fry her?',
      answer: 'No, she is too pretty.',
      show: false
    },
    {
      question: 'Does she love to play?',
      answer: 'Oh yes, especially when its late at night and her owner wants to go to bed!',
      show: false
    },
    {
      question: 'What\'s her favorite snack?',
      answer: 'She loves tube treats!',
      show: false
    },
    {
      question: 'What is your return policy?',
      answer: 'We dont have a return polcicy, she is not for sale...',
      show: false
    },
    {
      question: 'How do I track my order?',
      answer: 'She cant be ordered... but she likes to go outside and wander around the house!',
      show: false
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Hey! Who made this webiste...',
      show: false
    }
  ];

  toggleAnswer(faq: any) {
    faq.show = !faq.show;
  }
}
