import { Injectable } from '@angular/core';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { Observable, from } from 'rxjs'; // Import 'from' operator
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage = getStorage(); // this initializes the storage

  getDownloadURL(path: string): Promise<string> {
    const storageRef = ref(this.storage, path);
    return getDownloadURL(storageRef);
}
}