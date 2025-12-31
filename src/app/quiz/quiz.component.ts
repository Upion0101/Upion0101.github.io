import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  questions = [
    {
      question: "Where is Bob's favorite place to lay down on her owner?",
      answers: ["Lap", "Neck", "Shoulder", "Feet"],
      correctAnswer: "Neck"
    },
    {
      question: "What is Bob's favorite flavor of tube treat?",
      answers: ["Salmon", "Chicken", "Tuna", "Beef"],
      correctAnswer: "Chicken"
    },
    {
      question: "When is Bob's birthday?",
      answers: ["February 14th", "February 25th", "March 3rd", "January 1st"],
      correctAnswer: "February 25th"
    },
    {
      question: "What gender is Bob?",
      answers: ["Lady", "Gentleman", "", ""],
      correctAnswer: "Lady"
    },
    {
      question: "Who would beat Bob in a fight?",
      answers: ["Godzilla", "A T-Rex", "King Kong", "None of the above"],
      correctAnswer: "None of the above"
    },
    {
      question: "Which paw on Bob is pink?",
      answers: ["Front right", "Back left", "Front left", "Back right"],
      correctAnswer: "Back right"
    },
    {
      question: "Who is Bob's arch-nemesis?",
      answers: ["Adoba", "Neighbor's dog", "Bird outside", "The vacuum"],
      correctAnswer: "Adoba"
    },
    {
      question: "What’s Bob’s favorite time of day?",
      answers: ["Early morning", "Nap time", "Dinner time", "Late night"],
      correctAnswer: "Nap time"
    },
    {
      question: "What is Bob's superpower?",
      answers: ["Invisibility", "Teleportation", "Mind control", "Cuteness overload"],
      correctAnswer: "Cuteness overload"
    }
  ];

  userAnswers: string[] = new Array(this.questions.length).fill('');
  quizSubmitted = false;
  score = 0;

  submitQuiz(): void {
    this.score = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.userAnswers[i] === this.questions[i].correctAnswer) {
        this.score++;
      }
    }
    this.quizSubmitted = true;
  }
}
