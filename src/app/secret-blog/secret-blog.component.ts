import { Component } from '@angular/core';

@Component({
  selector: 'app-secret-blog',
  templateUrl: './secret-blog.component.html',
  styleUrls: ['./secret-blog.component.scss']
})
export class SecretBlogComponent {
  pin: string = '';
  isAuthenticated: boolean = false;
  invalidPin: boolean = false;
  posts: string[] = [
    "This is the first secret post.",
    "Here is another hidden message.",
    "More secret thoughts.",
    "PREEY GIRL"
  ];

  private correctPin: string = '1127'; // Set your desired 4-digit PIN here

  checkPin() {
    if (this.pin === this.correctPin) {
      this.isAuthenticated = true;
      this.invalidPin = false;
    } else {
      this.invalidPin = true;
    }
  }
}
