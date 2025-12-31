import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { StoriesComponent }       from './stories.component';
import { TheGreatNeckComponent }  from './the-great-neck/the-great-neck.component';
import { MissingTubeTreatsComponent } from './missing-tube-treats/missing-tube-treats.component';
import { MidnightMaymieComponent }   from './midnight-maymie/midnight-maymie.component';

const routes: Routes = [
  // “/stories” will render TheGreatNeckComponent in overview mode
  { path: '',                component: StoriesComponent },

  { path: 'the-great-neck', component: TheGreatNeckComponent },
  { path: 'missing-tube-treats', component: MissingTubeTreatsComponent },
  { path: 'midnight-maymie',     component: MidnightMaymieComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoriesRoutingModule {}
