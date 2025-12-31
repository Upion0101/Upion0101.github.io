import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Post {
  id?: string;
  content: string;
  displayName: string | null;
  photoURL: string | null;
  timestamp: Date | Timestamp;
  likes?: { [userId: string]: boolean };
  comments?: Comment[];
}

export interface Comment {
  id?: string;
  content: string;
  displayName: string | null;
  timestamp: Date | Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  getPosts(limit: number = 10, lastVisible?: any): Observable<Post[]> {
    const queryFn = (ref: any) => {
      let query = ref.orderBy('timestamp', 'desc').limit(limit);
      if (lastVisible) query = query.startAfter(lastVisible);
      return query;
    };

    return this.firestore.collection('posts', queryFn).get().pipe(
      map((snapshot: QuerySnapshot<any>) =>
        snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      )
    );
  }

  addPost(postData: Post): Promise<void> {
    return this.firestore.collection('posts').add(postData)
      .then(() => console.log('Post added successfully'))
      .catch(error => console.error('Error adding post:', error));
  }

  deletePost(postId: string): Promise<void> {
    return this.firestore.collection('posts').doc(postId).delete()
      .then(() => console.log('Post deleted'))
      .catch(error => console.error('Error deleting post:', error));
  }

  toggleLike(postId: string, userId: string): Promise<void> {
    const postRef = this.firestore.collection('posts').doc(postId).ref;

    return this.firestore.firestore.runTransaction(async transaction => {
      const postDoc = await transaction.get(postRef);
      if (!postDoc.exists) return;

      const postData = postDoc.data() as Post;
      const likes = postData.likes || {};
      if (likes[userId]) {
        delete likes[userId];
      } else {
        likes[userId] = true;
      }
      transaction.update(postRef, { likes });
    });
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.firestore.collection(`posts/${postId}/comments`, ref => ref.orderBy('timestamp', 'asc'))
      .valueChanges({ idField: 'id' }) as Observable<Comment[]>;
  }

  addComment(postId: string, commentData: Comment): Promise<void> {
    return this.firestore.collection(`posts/${postId}/comments`).add(commentData)
      .then(() => console.log('Comment added successfully'))
      .catch(error => console.error('Error adding comment:', error));
  }
}
