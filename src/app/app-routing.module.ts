import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared-module/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  {path: '', redirectTo: 'moja-kosmetyczka', pathMatch: 'full'},
  {path: 'moja-kosmetyczka', loadChildren: () => import ('./washbag/washbag.module').then(m => m.WashbagModule) , canLoad: [AuthGuard] },
  {path: 'moje-konto', loadChildren: () => import ('./user/user.module').then(m => m.UserModule) , canLoad: [AuthGuard]},
  {path: 'dziennik-zabiegów',
    loadChildren: () => import ('./activities-list/activities-list.module').then(m => m.ActivitiesListModule), canLoad: [AuthGuard]},
  {path: 'galeria', loadChildren: () => import ('./gallery/gallery.module').then(m => m.GalleryModule), canLoad: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
