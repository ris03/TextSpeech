import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PracCompPage } from './prac-comp';

@NgModule({
  declarations: [
    PracCompPage,
  ],
  imports: [
    IonicPageModule.forChild(PracCompPage),
  ],
})
export class PracCompPageModule {}
