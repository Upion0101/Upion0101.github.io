import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BobLifeComponent } from './bob-life/bob-life.component';
import { NameTreeComponent } from './name-tree/name-tree.component';
import { AnthemComponent } from './anthem/anthem.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, // This is the default route for the home page
  { path: 'about', component: AboutComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'bob-life', component: BobLifeComponent },
  { path: 'name-tree', component: NameTreeComponent },
  { path: 'anthem', component: AnthemComponent },
  { path: '**', component: PageNotFoundComponent }  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
