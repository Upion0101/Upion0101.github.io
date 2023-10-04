import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

import { initializeApp } from 'firebase/app';
import { environment } from './environments/environment'; // Adjust the path

// Initialize Firebase using the config from environment
initializeApp(environment.firebaseConfig);
if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
