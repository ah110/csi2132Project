import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'room',
    pathMatch: 'full'
  },

  {
    path: 'room',
    loadChildren: () => import('./view/room-list/room-list.module').then((m) => m.RoomListModule)
  },
  {
    path: 'room/:name',
    loadChildren: () => import('./view/room-from/room-from.module').then((m) => m.RoomFromModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./view/room-from/room-from.module').then((m) => m.RoomFromModule)
  },
  {
    path: 'booking/:id',
    loadChildren: () => import('./view/room-from/room-from.module').then((m) => m.RoomFromModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
