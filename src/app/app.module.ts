import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';

import { LightboxModule } from 'ngx-lightbox';
import { BobLifeComponent } from './bob-life/bob-life.component';
import { NameTreeComponent } from './name-tree/name-tree.component';
import { AnthemComponent } from './anthem/anthem.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    GalleryComponent,
    BobLifeComponent,
    NameTreeComponent,
    AnthemComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    LightboxModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
