import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: Observable<any>;
  displayName: string = '';
  photoURL: string = '';
  uploadPercent: number | null = null;
  selectedFileName: string | null = null;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUserProfile();
  }

  ngOnInit(): void {
    this.user.subscribe(user => {
      if (user) {
        this.displayName = user.displayName || '';
        this.photoURL = user.photoURL || '';
      }
    });
  }

  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input?.files && input.files.length > 0) {
    const file = input.files[0];
    this.selectedFileName = file.name;
    console.log('Selected file:', file);

    this.authService.uploadProfilePicture(file).subscribe({
      next: (response) => {
        if (response.url) {
          console.log('File uploaded successfully:', response.url);
          this.photoURL = response.url;
          this.updateProfile();
        }
      },
      error: (err) => {
        console.error('Failed to upload file:', err);
        alert('Error uploading image');
      }
    });
  }
}

  updateProfile(): void {
    this.authService.updateProfile(this.displayName, this.photoURL).then(() => {
      alert('Profile updated successfully!');
    }).catch(error => {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    });
  }
}
