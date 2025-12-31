import { Component, OnInit } from '@angular/core';
import { FirebaseService, Post, Comment } from 'src/app/blog/firebase.service';
import { AuthService } from '../auth.service';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        animate(
          '0.5s ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateY(20px)', offset: 0 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
          ])
        )
      ]),
      transition(':leave', [
        animate(
          '0.3s ease-in',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        )
      ])
    ])
  ]
})
export class BlogComponent implements OnInit {
  posts: Post[] = [];
  newPost: string = '';
  userPhotoURL: string | null = null;
  userName: string | null = null;
  userId: string | null = null;
  lastVisible: any = null;
  isLoading: boolean = false;
  newComment: { [key: string]: string } = {};

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe(user => {
      if (user) {
        this.userPhotoURL = user.photoURL || 'assets/default-profile.png';
        this.userName = user.displayName || 'Anonymous';
        this.userId = user.uid;
      }
    });

    this.loadPosts();
  }

  loadPosts() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.firebaseService.getPosts(10, this.lastVisible).subscribe(posts => {
      if (posts.length > 0) {
        this.lastVisible = posts[posts.length - 1].timestamp;
        this.posts = [...this.posts, ...posts];
      }
      this.isLoading = false;
    });
  }

  addPost() {
    if (this.newPost.trim()) {
      const newPostData: Post = {
        content: this.newPost,
        displayName: this.userName,
        photoURL: this.userPhotoURL,
        timestamp: new Date(),
        likes: {}
      };
      this.firebaseService.addPost(newPostData).then(() => {
        this.newPost = '';
      });
    }
  }

  deletePost(postId?: string) {
    if (!postId) return;
    this.firebaseService.deletePost(postId).then(() => {
      this.posts = this.posts.filter(post => post.id !== postId);
    });
  }

  toggleLike(postId?: string) {
    if (!postId || !this.userId) return;

    // Ensure `this.userId` is defined for TypeScript
    const userId = this.userId;

    // Find the post in the local array
    const post = this.posts.find(p => p.id === postId);
    if (!post) return;

    // Optimistically update the UI
    const userHasLiked = post.likes?.[userId] ?? false;
    if (!post.likes) post.likes = {}; // Ensure `likes` exists
    if (userHasLiked) {
      delete post.likes[userId]; // Remove like
    } else {
      post.likes[userId] = true; // Add like
    }

    // Call Firebase service to update the database
    this.firebaseService.toggleLike(postId, userId).catch(err => {
      console.error('Error toggling like:', err);

      // Revert the UI if the Firebase operation fails
      if (post.likes) {
        if (userHasLiked) {
          post.likes[userId] = true; // Restore like
        } else {
          delete post.likes[userId]; // Remove like
        }
      }
    });
  }

  loadComments(postId?: string) {
    if (!postId) return;
    this.firebaseService.getComments(postId).subscribe(comments => {
      const post = this.posts.find(p => p.id === postId);
      if (post) post.comments = comments;
    });
  }

  addComment(postId?: string) {
    if (!postId || !this.newComment[postId || '']?.trim()) return;
    const commentData: Comment = {
      content: this.newComment[postId || ''],
      displayName: this.userName,
      timestamp: new Date()
    };
    this.firebaseService.addComment(postId, commentData).then(() => {
      this.newComment[postId || ''] = '';
    });
  }

  convertTimestampToDate(timestamp: Date | Timestamp): Date {
    return timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
