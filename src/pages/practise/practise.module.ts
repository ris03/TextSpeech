import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PractisePage } from './practise';

@NgModule({
  declarations: [
    PractisePage,
  ],
  imports: [
    IonicPageModule.forChild(PractisePage),
  ],
})
export class PractisePageModule {}
