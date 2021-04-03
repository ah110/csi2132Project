
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RoomFromComponent } from './room-from.component';

const routes: Routes = [
  {
    path: '',
    component: RoomFromComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ],
  exports: [RouterModule],
  declarations: [RoomFromComponent],
  providers: [],
})
export class RoomFromModule { }
