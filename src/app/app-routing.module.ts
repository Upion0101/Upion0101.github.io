import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BobLifeComponent } from './bob-life/bob-life.component';
import { NameTreeComponent } from './name-tree/name-tree.component';
import { QuizComponent } from './quiz/quiz.component';
import { AnthemComponent } from './anthem/anthem.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FaqComponent } from './faq/faq.component';
import { SecretBlogComponent } from './secret-blog/secret-blog.component';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // default landing page

  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'bob-life', component: BobLifeComponent },
  { path: 'name-tree', component: NameTreeComponent },
  { path: 'anthem', component: AnthemComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'secret-blog', component: SecretBlogComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'profile', component: ProfileComponent },

  // ✅ Bobdle (standalone component)
  {
    path: 'bobdle',
    loadComponent: () =>
      import('./pages/bobdle/bobdle.component').then(m => m.BobdleComponent),
  },

  // Lazy-loaded stories
  {
    path: 'stories',
    loadChildren: () =>
      import('./stories/stories.module').then(m => m.StoriesModule),
  },

  // 404
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
