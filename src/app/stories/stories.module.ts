import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }        from '@angular/forms'; 

import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesComponent } from './stories.component';
import { TheGreatNeckComponent } from './the-great-neck/the-great-neck.component';
import { MissingTubeTreatsComponent } from './missing-tube-treats/missing-tube-treats.component';
import { MidnightMaymieComponent } from './midnight-maymie/midnight-maymie.component';


@NgModule({
  declarations: [
    StoriesComponent,
    TheGreatNeckComponent,
    MissingTubeTreatsComponent,
    MidnightMaymieComponent
  ],
  imports: [
    CommonModule,
    StoriesRoutingModule,
    FormsModule
  ]
})
export class StoriesModule { }
