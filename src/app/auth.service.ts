import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpEventType } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverUrl = environment.serverUrl;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {
    // Track authentication state
    this.afAuth.authState.subscribe(user => {
      this.loggedIn.next(!!user);
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  async signup(email: string, password: string, displayName: string, photoURL: string = ''): Promise<void> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await result.user?.updateProfile({ displayName, photoURL });
      alert('Signup successful!');
      await this.router.navigate(['/profile']);
    } catch (error: any) {
      alert(error.message);
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      await this.router.navigate(['/profile']);
    } catch (error: any) {
      alert(error.message);
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    await this.router.navigate(['/login']);
  }

  getUserProfile(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  /**
   * Upload profile picture to Raspberry Pi server
   */
  uploadProfilePicture(file: File): Observable<{ url: string }> {
  const uploadUrl = `https://pi.boblovers.com/upload`;

  const formData = new FormData();
  formData.append('file', file);

  return this.http.post<{ url: string }>(uploadUrl, formData).pipe(
    map((response: any) => {
      if (response.url) {
        // Ensure that the returned URL includes the /uploads/ path
        const correctedUrl = `https://pi.boblovers.com/uploads/${response.url.split('/').pop()}`;

        return { url: correctedUrl };
      }
      return { url: '' };
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('Error uploading image:', error);
      return throwError(() => new Error('Image upload failed'));
    })
  );
}

  async updateProfile(displayName: string, photoURL: string): Promise<void> {
    const currentUser = await this.afAuth.currentUser;
    if (currentUser) {
      await currentUser.updateProfile({ displayName, photoURL });
    }
  }

  async getCurrentUserUid(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null;
  }
}
